import React, { useState } from 'react';
import {
  Search,
  UserPlus,
  MoreVertical,
  SlidersHorizontal,
  ChevronLeft,
  ChevronRight,
  Shield,
  Trash2,
  Edit2,
  Mail,
  Phone,
} from 'lucide-react';
import { User, UserRole, UserStatus } from '../../types';

interface UserManagementViewProps {
  users: User[];
  onAddUserClick: () => void;
  onEditUser: (user: User) => void;
  onDeleteUser: (userId: string) => void;
}

export const UserManagementView: React.FC<UserManagementViewProps> = ({
  users,
  onAddUserClick,
  onEditUser,
  onDeleteUser,
}) => {
  const [search, setSearch] = useState('');
  const [roleFilter, setRoleFilter] = useState<string>('');
  const [statusFilter, setStatusFilter] = useState<string>('');
  const [activeMenuId, setActiveMenuId] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 4;

  const filteredUsers = users.filter((u) => {
    const matchesSearch =
      u.name.toLowerCase().includes(search.toLowerCase()) ||
      u.email.toLowerCase().includes(search.toLowerCase()) ||
      u.phone.includes(search);
    const matchesRole = !roleFilter || u.role.toLowerCase() === roleFilter.toLowerCase();
    const matchesStatus = !statusFilter || u.status.toLowerCase() === statusFilter.toLowerCase();
    return matchesSearch && matchesRole && matchesStatus;
  });

  const totalPages = Math.max(1, Math.ceil(filteredUsers.length / itemsPerPage));
  const displayedUsers = filteredUsers.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  return (
    <div className="space-y-6 animate-in fade-in duration-200">
      {/* Page Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <h2 className="font-['Poppins',sans-serif] text-2xl sm:text-3xl font-bold text-gray-900 tracking-tight">
            User Management
          </h2>
          <p className="text-gray-500 text-sm mt-1 max-w-2xl">
            Manage system access, roles, and administrative privileges for staff and volunteers across the organization.
          </p>
        </div>

        <button
          onClick={onAddUserClick}
          className="bg-[#BF0A30] hover:bg-[#D7263D] active:scale-98 text-white px-5 py-2.5 rounded-xl font-semibold text-xs sm:text-sm flex items-center justify-center gap-2 shadow-xs transition-all w-fit"
        >
          <UserPlus size={16} />
          <span>Add New User</span>
        </button>
      </div>

      {/* Controls / Filter Bar */}
      <div className="bg-white rounded-2xl p-4 border border-gray-200/80 shadow-xs flex flex-col md:flex-row gap-4 justify-between items-center">
        {/* Search Input */}
        <div className="relative w-full md:w-96">
          <Search size={18} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400" />
          <input
            type="text"
            value={search}
            onChange={(e) => {
              setSearch(e.target.value);
              setCurrentPage(1);
            }}
            placeholder="Search users by name or email..."
            className="w-full bg-[#F8FAFC] border border-gray-200 rounded-xl pl-10 pr-4 py-2.5 text-sm text-gray-800 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-[#002868]/20 focus:border-[#002868] transition-all"
          />
        </div>

        {/* Dropdown Filters */}
        <div className="flex flex-wrap gap-3 w-full md:w-auto">
          <div className="relative min-w-[130px] flex-1 sm:flex-none">
            <select
              value={roleFilter}
              onChange={(e) => {
                setRoleFilter(e.target.value);
                setCurrentPage(1);
              }}
              className="w-full appearance-none bg-white border border-gray-200 rounded-xl pl-3.5 pr-8 py-2.5 text-xs sm:text-sm font-medium text-gray-700 focus:outline-none focus:ring-2 focus:ring-[#002868]/20 focus:border-[#002868] cursor-pointer"
            >
              <option value="">All Roles</option>
              <option value="Admin">Admin</option>
              <option value="Staff">Staff</option>
              <option value="Volunteer">Volunteer</option>
            </select>
          </div>

          <div className="relative min-w-[130px] flex-1 sm:flex-none">
            <select
              value={statusFilter}
              onChange={(e) => {
                setStatusFilter(e.target.value);
                setCurrentPage(1);
              }}
              className="w-full appearance-none bg-white border border-gray-200 rounded-xl pl-3.5 pr-8 py-2.5 text-xs sm:text-sm font-medium text-gray-700 focus:outline-none focus:ring-2 focus:ring-[#002868]/20 focus:border-[#002868] cursor-pointer"
            >
              <option value="">All Statuses</option>
              <option value="Active">Active</option>
              <option value="Inactive">Inactive</option>
            </select>
          </div>

          <button
            onClick={() => {
              setSearch('');
              setRoleFilter('');
              setStatusFilter('');
            }}
            className="p-2.5 bg-gray-50 hover:bg-gray-100 border border-gray-200 rounded-xl text-gray-500 hover:text-gray-800 transition-colors"
            title="Reset Filters"
          >
            <SlidersHorizontal size={17} />
          </button>
        </div>
      </div>

      {/* Data Table */}
      <div className="bg-white rounded-2xl border border-gray-200/80 shadow-xs overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse min-w-[700px]">
            <thead>
              <tr className="bg-gray-50/80 border-b border-gray-200/80 text-[11px] font-bold text-gray-500 uppercase tracking-wider">
                <th className="py-4 px-6">User</th>
                <th className="py-4 px-6">Contact Info</th>
                <th className="py-4 px-6">Role</th>
                <th className="py-4 px-6">Status</th>
                <th className="py-4 px-6 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100 text-sm">
              {displayedUsers.length === 0 ? (
                <tr>
                  <td colSpan={5} className="py-12 text-center text-gray-400">
                    No users match the search criteria.
                  </td>
                </tr>
              ) : (
                displayedUsers.map((user) => (
                  <tr
                    key={user.id}
                    className="hover:bg-gray-50/60 transition-colors group relative"
                  >
                    {/* User Profile column */}
                    <td className="py-4 px-6 whitespace-nowrap">
                      <div className="flex items-center gap-3.5">
                        {user.avatarUrl ? (
                          <img
                            src={user.avatarUrl}
                            alt={user.name}
                            className="h-10 w-10 rounded-full object-cover border border-gray-200 shrink-0"
                          />
                        ) : (
                          <div className="h-10 w-10 rounded-full bg-blue-100 text-[#002868] flex items-center justify-center font-bold text-xs shrink-0 border border-blue-200">
                            {user.initials || user.name.slice(0, 2).toUpperCase()}
                          </div>
                        )}
                        <div>
                          <div className="font-semibold text-gray-900 leading-tight">
                            {user.name}
                          </div>
                          <div className="text-xs text-gray-400 mt-0.5">
                            Joined {user.joinedDate}
                          </div>
                        </div>
                      </div>
                    </td>

                    {/* Contact Info */}
                    <td className="py-4 px-6 whitespace-nowrap">
                      <div className="text-xs text-gray-800 flex items-center gap-1.5">
                        <Mail size={12} className="text-gray-400" />
                        {user.email}
                      </div>
                      <div className="text-xs text-gray-500 mt-0.5 flex items-center gap-1.5">
                        <Phone size={12} className="text-gray-400" />
                        {user.phone}
                      </div>
                    </td>

                    {/* Role */}
                    <td className="py-4 px-6 whitespace-nowrap">
                      <span
                        className={`inline-flex items-center px-2.5 py-1 rounded-md text-xs font-semibold ${
                          user.role === 'Admin'
                            ? 'bg-blue-100 text-[#002868]'
                            : user.role === 'Staff'
                            ? 'bg-sky-100 text-sky-800'
                            : 'bg-gray-100 text-gray-700'
                        }`}
                      >
                        {user.role}
                      </span>
                    </td>

                    {/* Status */}
                    <td className="py-4 px-6 whitespace-nowrap">
                      <span
                        className={`inline-flex items-center gap-1.5 text-xs font-semibold ${
                          user.status === 'Active' ? 'text-emerald-700' : 'text-red-600'
                        }`}
                      >
                        <span
                          className={`w-2 h-2 rounded-full ${
                            user.status === 'Active' ? 'bg-emerald-500' : 'bg-red-500'
                          }`}
                        />
                        {user.status}
                      </span>
                    </td>

                    {/* Actions */}
                    <td className="py-4 px-6 whitespace-nowrap text-right relative">
                      <div className="relative inline-block text-left">
                        <button
                          onClick={() =>
                            setActiveMenuId(activeMenuId === user.id ? null : user.id)
                          }
                          className="text-gray-400 hover:text-gray-800 p-1.5 rounded-lg hover:bg-gray-100 transition-colors"
                        >
                          <MoreVertical size={18} />
                        </button>

                        {activeMenuId === user.id && (
                          <div className="absolute right-0 mt-1 w-36 bg-white rounded-xl shadow-xl border border-gray-100 p-1.5 z-30 animate-in fade-in zoom-in-95 duration-100">
                            <button
                              onClick={() => {
                                onEditUser(user);
                                setActiveMenuId(null);
                              }}
                              className="w-full flex items-center gap-2 px-2.5 py-1.5 text-xs text-gray-700 hover:bg-gray-50 rounded-lg text-left"
                            >
                              <Edit2 size={13} /> Edit User
                            </button>
                            <button
                              onClick={() => {
                                onDeleteUser(user.id);
                                setActiveMenuId(null);
                              }}
                              className="w-full flex items-center gap-2 px-2.5 py-1.5 text-xs text-red-600 hover:bg-red-50 rounded-lg text-left"
                            >
                              <Trash2 size={13} /> Delete User
                            </button>
                          </div>
                        )}
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        {/* Pagination Footer */}
        <div className="bg-gray-50/60 border-t border-gray-200/80 p-4 px-6 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-gray-500">
          <span>
            Showing {displayedUsers.length > 0 ? (currentPage - 1) * itemsPerPage + 1 : 0} to{' '}
            {Math.min(currentPage * itemsPerPage, filteredUsers.length)} of {filteredUsers.length}{' '}
            users
          </span>

          <div className="flex items-center gap-1.5">
            <button
              onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
              disabled={currentPage === 1}
              className="p-1.5 rounded-lg border border-gray-200 hover:bg-white disabled:opacity-40 transition-colors"
            >
              <ChevronLeft size={16} />
            </button>
            {Array.from({ length: totalPages }).map((_, idx) => (
              <button
                key={idx}
                onClick={() => setCurrentPage(idx + 1)}
                className={`w-7 h-7 rounded-lg text-xs font-semibold transition-all ${
                  currentPage === idx + 1
                    ? 'bg-[#002868] text-white shadow-2xs'
                    : 'border border-gray-200 hover:bg-white text-gray-700'
                }`}
              >
                {idx + 1}
              </button>
            ))}
            <button
              onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
              disabled={currentPage === totalPages}
              className="p-1.5 rounded-lg border border-gray-200 hover:bg-white disabled:opacity-40 transition-colors"
            >
              <ChevronRight size={16} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
