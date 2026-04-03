const Record = require("../models/Record");

// Create a record (Admin only)
exports.createRecord = async (req, res) => {
    try {
        const { amount, type, category, date, notes, createdBy } = req.body;

        if (!amount || amount <= 0) {
            return res.status(400).json({ message: "Invalid amount" });
        }

        const record = await Record.create({
            amount,
            type,
            category,
            date,
            notes,
            createdBy: createdBy || req.user._id,
        });

        res.status(201).json(record);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Get all records (with filtering and pagination)
exports.getRecords = async (req, res) => {
    try {
        const { type, category, startDate, endDate } = req.query;

        let filter = {};

        if (type) filter.type = type;
        if (category) filter.category = category;

        if (startDate && endDate) {
            filter.date = {
                $gte: new Date(startDate),
                $lte: new Date(endDate),
            };
        }

        const records = await Record.find({
            ...filter,
            createdBy: req.user._id
        }).sort({ date: -1 });

        res.json(records);

    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Get a single record by ID
exports.getRecordById = async (req, res) => {
    try {
        const record = await Record.findById(req.params.id);

        if (!record) {
            return res.status(404).json({ message: "Record not found" });
        }

        if (record.createdBy.toString() !== req.user._id.toString()) {
            return res.status(403).json({ message: "Not authorized" });
        }

        res.json(record);

    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Update a record (Admin only)
exports.updateRecord = async (req, res) => {
    try {
        const record = await Record.findById(req.params.id);

        if (!record) {
            return res.status(404).json({ message: "Record not found" });
        }

        if (record.createdBy.toString() !== req.user._id.toString()) {
            return res.status(403).json({ message: "Not authorized" });
        }

        Object.assign(record, req.body);
        await record.save();

        res.json(record);

    } catch (error) {
        res.status(500).json({ message: error.message });   
    }
};

// Delete a record (Admin only)
exports.deleteRecord = async (req, res) => {
    try {
        const record = await Record.findById(req.params.id);

        if (!record) {
            return res.status(404).json({ message: "Record not found" });
        }

        if (record.createdBy.toString() !== req.user._id.toString()) {
            return res.status(403).json({ message: "Not authorized" });
        }

        await record.deleteOne();

        res.json({ message: "Record deleted" });

    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};