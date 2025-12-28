import contactModel from "../models/contactModel.js";

export const createContact = async (req, res) => {
  try {
    const { firstName, lastName, email, message } = req.body;

    const newContact = new contactModel({
      firstName,
      lastName,
      email,
      message
    });

    const savedContact = await newContact.save();

    res.status(201).json({
      success: true,
      message: "Message sent successfully",
      data: savedContact
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error sending message",
      error: error.message
    });
  }
};

export const getAllContacts = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const skip = (page - 1) * limit;

    const contacts = await contactModel
      .find()
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit);

    const total = await contactModel.countDocuments();

    res.status(200).json({
      success: true,
      data: contacts,
      pagination: {
        currentPage: page,
        totalPages: Math.ceil(total / limit),
        totalContacts: total
      }
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error fetching contacts",
      error: error.message
    });
  }
};

export const getContactById = async (req, res) => {
  try {
    const contact = await contactModel.findById(req.params.id);

    if (!contact) {
      return res.status(404).json({
        success: false,
        message: "Contact not found"
      });
    }

    res.status(200).json({
      success: true,
      data: contact
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error fetching contact",
      error: error.message
    });
  }
};

export const updateContact = async (req, res) => {
  try {
    const updatedContact = await contactModel.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );

    if (!updatedContact) {
      return res.status(404).json({
        success: false,
        message: "Contact not found"
      });
    }

    res.status(200).json({
      success: true,
      message: "Contact updated successfully",
      data: updatedContact
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error updating contact",
      error: error.message
    });
  }
};

export const deleteContact = async (req, res) => {
  try {
    const deletedContact = await contactModel.findByIdAndDelete(req.params.id);

    if (!deletedContact) {
      return res.status(404).json({
        success: false,
        message: "Contact not found"
      });
    }

    res.status(200).json({
      success: true,
      message: "Contact deleted successfully"
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error deleting contact",
      error: error.message
    });
  }
};

export const getContactStats = async (req, res) => {
  try {
    const totalContacts = await contactModel.countDocuments();
    const newContacts = await contactModel.countDocuments({ status: 'new' });
    const readContacts = await contactModel.countDocuments({ status: 'read' });

    res.status(200).json({
      success: true,
      data: {
        total: totalContacts,
        new: newContacts,
        read: readContacts,
      }
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error fetching statistics",
      error: error.message
    });
  }
};

export const updateContactStatus = async (req, res) => {
  try {
    const { status } = req.body;
    
    const updatedContact = await contactModel.findByIdAndUpdate(
      req.params.id,
      { status },
      { new: true, runValidators: true }
    );

    if (!updatedContact) {
      return res.status(404).json({
        success: false,
        message: "Contact not found"
      });
    }

    res.status(200).json({
      success: true,
      message: `Contact status updated to ${status}`,
      data: updatedContact
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error updating contact status",
      error: error.message
    });
  }
};