import Wallet from "../models/Wallet.js";
import Transaction from "../models/Transaction.js";

export async function getWallet(req, res, next) {
  try {
    const wallet = await Wallet.findOne({ userId: req.user._id });
    res.json({
      success: true,
      balance: wallet?.balance ?? 0,
      formatted: `৳${(wallet?.balance ?? 0).toLocaleString()}`,
    });
  } catch (err) {
    next(err);
  }
}

export async function topUp(req, res, next) {
  try {
    const { amount } = req.body;
    if (!amount || amount <= 0) {
      return res.status(400).json({ success: false, message: "Valid amount is required" });
    }

    const wallet = await Wallet.findOneAndUpdate(
      { userId: req.user._id },
      { $inc: { balance: amount } },
      { new: true, upsert: true }
    );

    await Transaction.create({
      userId: req.user._id,
      type: "top-up",
      amount,
      status: "completed",
      description: "Wallet top-up",
    });

    res.json({ success: true, balance: wallet.balance, formatted: `৳${wallet.balance.toLocaleString()}` });
  } catch (err) {
    next(err);
  }
}

export async function getTransactions(req, res, next) {
  try {
    const transactions = await Transaction.find({ userId: req.user._id }).sort({ createdAt: -1 });
    res.json({ success: true, transactions });
  } catch (err) {
    next(err);
  }
}

export async function getRefunds(req, res, next) {
  try {
    const refunds = await Transaction.find({ userId: req.user._id, type: "refund" }).sort({ createdAt: -1 });
    res.json({ success: true, refunds });
  } catch (err) {
    next(err);
  }
}
