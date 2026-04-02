const Record = require("../models/Record");

exports.getDashboardSummary = async (req, res) => {
    try {
        const userId = req.user._id;

        // Total Income
        const totalIncome = await Record.aggregate([
            { $match: { createdBy: userId, type: "income" } },
            { $group: { _id: null, total: { $sum: "$amount" } } }
        ]);

        // Total Expenses
        const totalExpense = await Record.aggregate([
            { $match: { createdBy: userId, type: "expense" } },
            { $group: { _id: null, total: { $sum: "$amount" } } }
        ]);

        // Category Breakdown
        const categoryWise = await Record.aggregate([
            { $match: { createdBy: userId } },
            {
                $group: {
                    _id: "$category",
                    total: { $sum: "$amount" }
                }
            }
        ]);

        // recent records
        const recentTransactions = await Record.find({ createdBy: userId })
        .sort({ date: -1 })
        .limit(5);

        res.json({
        totalIncome: totalIncome[0]?.total || 0,
        totalExpense: totalExpense[0]?.total || 0,
        netBalance:
            (totalIncome[0]?.total || 0) -
            (totalExpense[0]?.total || 0),
        categoryWise,
        recentTransactions
        });

    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};