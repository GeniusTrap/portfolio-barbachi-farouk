import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { 
  FaTrash, 
  FaEye, 
  FaSpinner, 
  FaEnvelope, 
  FaChevronDown, 
  FaChevronUp, 
  FaSearch,
  FaFilter
} from 'react-icons/fa';
import { backendUrl } from '../App';

const ContactAdmin = () => {
  const [contacts, setContacts] = useState([]);
  const [filteredContacts, setFilteredContacts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [expandedId, setExpandedId] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [sortBy, setSortBy] = useState('new');

  useEffect(() => {
    fetchContacts();
  }, []);

  useEffect(() => {

    let result = [...contacts];
    
    if (searchTerm) {
      const term = searchTerm.toLowerCase();
      result = result.filter(contact =>
        contact.firstName?.toLowerCase().includes(term) ||
        contact.lastName?.toLowerCase().includes(term) ||
        contact.email?.toLowerCase().includes(term) ||
        contact.message?.toLowerCase().includes(term)
      );
    }
    
    result.sort((a, b) => {
      switch (sortBy) {
        case 'new':
          if (a.status === 'new' && b.status !== 'new') return -1;
          if (a.status !== 'new' && b.status === 'new') return 1;
          return new Date(b.createdAt) - new Date(a.createdAt);
        
        case 'name':
          const nameA = `${a.firstName} ${a.lastName}`.toLowerCase();
          const nameB = `${b.firstName} ${b.lastName}`.toLowerCase();
          return nameA.localeCompare(nameB);
        
        case 'date':
          return new Date(b.createdAt) - new Date(a.createdAt);
        
        default:
          return 0;
      }
    });
    
    setFilteredContacts(result);
  }, [contacts, searchTerm, sortBy]);

  const fetchContacts = async () => {
    try {
      setLoading(true);
      const response = await axios.get(`${backendUrl}/api/contacts`);
      
      if (response.data.success) {
        const sorted = response.data.data.sort((a, b) => {
          if (a.status === 'new' && b.status !== 'new') return -1;
          if (a.status !== 'new' && b.status === 'new') return 1;
          return new Date(b.createdAt) - new Date(a.createdAt);
        });
        setContacts(sorted || []);
      }
    } catch (error) {
      console.error('Error:', error);
      alert('Cannot connect to backend');
    } finally {
      setLoading(false);
    }
  };

  const updateStatus = async (id, status) => {
    try {
      const response = await axios.put(`${backendUrl}/api/contacts/${id}/status`, { status });
      if (response.data.success) {
        setContacts(contacts.map(contact => 
          contact._id === id ? response.data.data : contact
        ));
        if (status === 'read') {
          setExpandedId(id);
        }
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  const deleteContact = async (id) => {
    if (!window.confirm('Delete this contact?')) return;
    
    try {
      const response = await axios.delete(`${backendUrl}/api/contacts/${id}`);
      if (response.data.success) {
        setContacts(contacts.filter(contact => contact._id !== id));
        if (expandedId === id) {
          setExpandedId(null);
        }
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  const toggleMessage = (id) => {
    setExpandedId(expandedId === id ? null : id);
  };

  const unreadCount = contacts.filter(c => c.status === 'new').length;

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-800">Contact Messages</h1>
        <p className="text-gray-600">
          {unreadCount > 0 ? (
            <span className="text-orange-600 font-medium">
              {unreadCount} unread message{unreadCount > 1 ? 's' : ''}
            </span>
          ) : (
            'All messages read'
          )}
        </p>
      </div>

      <div className="bg-white rounded-lg shadow p-6">
        {/* Barre de contrôle */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-6">
          <div className="flex items-center gap-4">
            <button
              onClick={fetchContacts}
              className="px-4 py-2 bg-orange-500 text-white rounded-lg hover:bg-orange-600 flex items-center transition"
            >
              <FaSpinner className={`mr-2 ${loading ? 'animate-spin' : ''}`} />
              Refresh
            </button>
            
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <FaSearch className="text-gray-400" />
              </div>
              <input
                type="text"
                placeholder="Search by name, email..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 w-full md:w-64"
              />
            </div>
          </div>
          
          <div className="flex items-center gap-4">
            <div className="flex items-center">
              <FaFilter className="text-gray-400 mr-2" />
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-orange-500"
              >
                <option value="new">Unread First</option>
                <option value="date">Newest First</option>
                <option value="name">By Name</option>
              </select>
            </div>
            
            <div className="text-gray-600">
              Showing: <span className="font-bold">{filteredContacts.length}</span> of {contacts.length}
            </div>
          </div>
        </div>

        {loading ? (
          <div className="text-center py-12">
            <FaSpinner className="animate-spin text-4xl text-orange-500 mx-auto mb-4" />
            <p>Loading contacts...</p>
          </div>
        ) : filteredContacts.length === 0 ? (
          <div className="text-center py-12">
            <FaEnvelope className="text-4xl text-gray-400 mx-auto mb-4" />
            <p>{searchTerm ? 'No matching messages' : 'No messages yet'}</p>
            <p className="text-sm text-gray-500 mt-2">
              {searchTerm ? 'Try a different search term' : 'Send a message from the portfolio contact form'}
            </p>
          </div>
        ) : (
          <div className="space-y-4">
            {filteredContacts.map((contact) => {
              const isExpanded = expandedId === contact._id;
              const isUnread = contact.status === 'new';
              
              return (
                <div 
                  key={contact._id} 
                  className={`rounded-lg hover:shadow-md transition border ${
                    isUnread 
                      ? 'border-orange-300 bg-gradient-to-r from-orange-50 to-orange-100' 
                      : 'border-green-300 bg-gradient-to-r from-green-50 to-green-100'
                  }`}
                >
                  {/* En-tête */}
                  <div 
                    className="p-4 cursor-pointer hover:opacity-90 transition"
                    onClick={() => toggleMessage(contact._id)}
                  >
                    <div className="flex justify-between items-start">
                      <div className="flex-1">
                        <div className="flex items-center mb-2">
                          <h3 className={`font-bold text-lg ${
                            isUnread ? 'text-orange-800' : 'text-green-800'
                          }`}>
                            {contact.firstName} {contact.lastName}
                          </h3>
                          {isUnread && (
                            <span className="ml-3 px-3 py-1 bg-orange-500 text-white text-xs font-bold rounded-full animate-pulse">
                              NEW
                            </span>
                          )}
                        </div>
                        <p className={`font-medium ${
                          isUnread ? 'text-orange-600' : 'text-green-600'
                        }`}>
                          {contact.email}
                        </p>
                        
                        {/* Icône show/hide */}
                        <div className={`mt-2 flex items-center text-sm ${
                          isUnread ? 'text-orange-500' : 'text-green-500'
                        }`}>
                          {isExpanded ? (
                            <>
                              <FaChevronUp className="mr-1" />
                              <span>Hide message</span>
                            </>
                          ) : (
                            <>
                              <FaChevronDown className="mr-1" />
                              <span>Show message</span>
                            </>
                          )}
                        </div>
                      </div>
                      
                      <div className="text-right">
                        <div className={`text-sm ${
                          isUnread ? 'text-orange-500' : 'text-green-500'
                        }`}>
                          {new Date(contact.createdAt).toLocaleDateString()}
                        </div>
                        <div className="mt-2 space-x-2">
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              updateStatus(contact._id, 'read');
                              if (!isExpanded) {
                                setExpandedId(contact._id);
                              }
                            }}
                            className={`px-3 py-1 rounded text-sm transition ${
                              isUnread
                                ? 'bg-orange-500 text-white hover:bg-orange-600'
                                : 'bg-green-500 text-white hover:bg-green-600'
                            }`}
                          >
                            <FaEye className="inline mr-1" /> 
                            {isUnread ? 'Mark as Read' : 'Read'}
                          </button>
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              deleteContact(contact._id);
                            }}
                            className="px-3 py-1 bg-red-500 text-white rounded text-sm hover:bg-red-600 transition"
                          >
                            <FaTrash className="inline mr-1" /> Delete
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  {/* Message déplié */}
                  {isExpanded && (
                    <div className="px-4 pb-4 pt-0">
                      <div className="mt-3 bg-white/80 p-4 rounded-lg border">
                        <h4 className={`font-bold mb-2 ${
                          isUnread ? 'text-orange-700' : 'text-green-700'
                        }`}>
                          📩 Message
                        </h4>
                        <p className="text-gray-800 whitespace-pre-wrap bg-white p-3 rounded border">
                          {contact.message}
                        </p>
                        <div className="mt-3 text-xs text-gray-500">
                          Received: {new Date(contact.createdAt).toLocaleString()}
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        )}
      </div>

    </div>
  );
};

export default ContactAdmin;