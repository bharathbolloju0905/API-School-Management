const db = require('../DB/ConnectToDb.js');

module.exports.addSchoolData = async (req, res) => {
    const { name, address, latitude, longitude } = req.body;

  

    const isValid = validateDetails(name, address, latitude, longitude);

    console.log(isValid, name, address, latitude, longitude);

    if (!isValid) {
        return res.status(400).json({ error: 'Invalid input data' });
    }

    const db = require('../DB/ConnectToDb.js');

    db.run(`INSERT INTO SchoolData (name, address, latitude, longitude) VALUES (?, ?, ?, ?)`, [name, address, latitude, longitude], function(err) {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        res.status(201).json({ id: this.lastID });
    });
}

function validateDetails(name, address, latitude, longitude) {
    if (!name || !address || !latitude || !longitude) {
        return false;
    }
    if (typeof name !== 'string' || typeof address !== 'string') {
        return false;
    }
    if (!Number.isFinite(latitude) || !Number.isFinite(longitude)) {
        return false;
    }
    return true;
}

module.exports.getSchools = async (req, res) => {
    const { latitude, longitude } = req.query;

    if (!latitude || !longitude || !Number.isFinite(parseFloat(latitude)) || !Number.isFinite(parseFloat(longitude))) {
        return res.status(400).json({ error: 'Invalid or missing latitude/longitude' });
    }

    db.all(`SELECT * FROM SchoolData`, [], (err, rows) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }

        const userLatitude = parseFloat(latitude);
        const userLongitude = parseFloat(longitude);

        const sortedRows = rows.map(school => {
            const distance = calculateDistance(userLatitude, userLongitude, school.latitude, school.longitude);
            return { ...school, distance };
        }).sort((a, b) => a.distance - b.distance);

        res.status(200).json(sortedRows);
    });

};


//Euclidean distance calculation
function calculateDistance(lat1, lon1, lat2, lon2) {
    const x = lat2 - lat1;
    const y = lon2 - lon1;
    return Math.sqrt(x * x + y * y);
}