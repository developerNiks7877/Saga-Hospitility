import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import {
  User,
  CalendarCheck,
  Heart,
  Tag,
  HelpCircle,
  Settings,
  Shield,
  Smartphone,
  Bed,
  Utensils,
  Sparkles,
  Check,
  Undo,
  Save,
  Lock,
  Camera
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useToast } from '../context/ToastContext';
import Card from '../components/ui/Card';
import Button from '../components/ui/Button';
import Modal from '../components/ui/Modal';

export default function MyProfile() {
  const navigate = useNavigate();
  const { user, updateProfile } = useAuth();
  const { showToast } = useToast();

  const [activeSection, setActiveSection] = useState('profile');

  // Form State
  const [profileData, setProfileData] = useState({
    firstName: user?.firstName || user?.fullName?.trim().split(/\s+/)[0] || '',
    lastName: user?.lastName || user?.fullName?.trim().split(/\s+/).slice(1).join(' ') || '',
    email: user?.email || '',
    phoneNumber: user?.phoneNumber || '+91 98765 43210',
    address: user?.address || '123 Serenity Lane, Bandra West, Mumbai, Maharashtra'
  });

  const [twoFaEnabled, setTwoFaEnabled] = useState(user?.twoFactorEnabled || false);

  const [preferences, setPreferences] = useState({
    room: user?.preferences?.room || ['High Floor', 'Quiet Room', 'Extra Pillows'],
    dining: user?.preferences?.dining || ['Vegetarian', 'Gluten-Free', 'Ayurvedic Herbals'],
    wellness: user?.preferences?.wellness || ['Spa Access', 'Yoga Classes']
  });

  const [isPasswordModalOpen, setIsPasswordModalOpen] = useState(false);
  const [passwordForm, setPasswordForm] = useState({ current: '', newPass: '', confirm: '' });

  const togglePreference = (category, item) => {
    setPreferences((prev) => {
      const currentList = prev[category] || [];
      const updated = currentList.includes(item)
        ? currentList.filter((i) => i !== item)
        : [...currentList, item];
      return { ...prev, [category]: updated };
    });
  };

  const handleSave = () => {
    updateProfile({
      ...profileData,
      fullName: `${profileData.firstName} ${profileData.lastName}`.trim(),
      twoFactorEnabled: twoFaEnabled,
      preferences
    });
    showToast('success', 'Your profile and luxury preferences have been saved successfully.');
  };

  const handleDiscard = () => {
    setProfileData({
      firstName: user?.firstName || user?.fullName?.trim().split(/\s+/)[0] || '',
      lastName: user?.lastName || user?.fullName?.trim().split(/\s+/).slice(1).join(' ') || '',
      email: user?.email || '',
      phoneNumber: user?.phoneNumber || '+91 98765 43210',
      address: user?.address || '123 Serenity Lane, Bandra West, Mumbai'
    });
    showToast('info', 'Changes discarded.');
  };

  const handlePasswordUpdate = (e) => {
    e.preventDefault();
    if (passwordForm.newPass !== passwordForm.confirm) {
      showToast('error', 'New passwords do not match.');
      return;
    }
    showToast('success', 'Security password updated successfully.');
    setIsPasswordModalOpen(false);
    setPasswordForm({ current: '', newPass: '', confirm: '' });
  };

  const allRoomOptions = ['High Floor', 'Quiet Room', 'Extra Pillows', 'Palace Courtyard View', 'Late Check-out'];
  const allDiningOptions = ['Vegetarian', 'Gluten-Free', 'Vegan', 'Ayurvedic Herbals', 'Royal Thali Tasting'];
  const allWellnessOptions = ['Spa Access', 'Yoga Classes', 'Meditation Pavilion', 'Desert Nature Walk'];

  return (
    <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
      {/* Title */}
      <div style={{ marginBottom: '28px' }}>
        <span style={{ fontSize: '11px', fontWeight: 700, color: 'var(--warm-gold)', letterSpacing: '0.12em', textTransform: 'uppercase' }}>
          Account Management
        </span>
        <h1
          style={{
            fontFamily: 'var(--font-display)',
            fontSize: '34px',
            fontWeight: 600,
            color: 'var(--deep-olive)',
            marginTop: '2px'
          }}
        >
          My Profile & Settings
        </h1>
        <p style={{ fontSize: '14.5px', color: 'var(--text-muted)', marginTop: '4px' }}>
          Manage your personal details, security credentials, and personalized hospitality preferences.
        </p>
      </div>

      <div
        style={{
          display: 'grid',
          gridTemplateColumns: '240px 1fr',
          gap: '32px',
          alignItems: 'start'
        }}
        className="profile-layout-grid"
      >
        {/* Left Sub-Navigation Menu */}
        <Card style={{ padding: '16px 12px' }}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
            <button
              onClick={() => setActiveSection('profile')}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '10px',
                padding: '10px 14px',
                borderRadius: 'var(--radius-sm)',
                fontSize: '14px',
                fontWeight: activeSection === 'profile' ? 600 : 500,
                color: activeSection === 'profile' ? 'var(--deep-olive)' : 'var(--text-muted)',
                backgroundColor: activeSection === 'profile' ? 'var(--dusky-ivory)' : 'transparent',
                border: activeSection === 'profile' ? '1px solid var(--warm-gold)' : '1px solid transparent',
                cursor: 'pointer',
                textAlign: 'left'
              }}
            >
              <User size={16} style={{ color: 'var(--warm-gold)' }} />
              <span>Personal Info</span>
            </button>

            <Link
              to="/my-bookings"
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '10px',
                padding: '10px 14px',
                borderRadius: 'var(--radius-sm)',
                fontSize: '14px',
                fontWeight: 500,
                color: 'var(--text-muted)',
                textDecoration: 'none'
              }}
            >
              <CalendarCheck size={16} style={{ color: 'var(--warm-gold)' }} />
              <span>My Bookings</span>
            </Link>

            <Link
              to="/offers"
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '10px',
                padding: '10px 14px',
                borderRadius: 'var(--radius-sm)',
                fontSize: '14px',
                fontWeight: 500,
                color: 'var(--text-muted)',
                textDecoration: 'none'
              }}
            >
              <Tag size={16} style={{ color: 'var(--warm-gold)' }} />
              <span>Special Offers</span>
            </Link>

            <div style={{ height: '1px', background: 'var(--border-light)', margin: '8px 0' }} />

            <button
              onClick={() => setActiveSection('security')}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '10px',
                padding: '10px 14px',
                borderRadius: 'var(--radius-sm)',
                fontSize: '14px',
                fontWeight: activeSection === 'security' ? 600 : 500,
                color: activeSection === 'security' ? 'var(--deep-olive)' : 'var(--text-muted)',
                backgroundColor: activeSection === 'security' ? 'var(--dusky-ivory)' : 'transparent',
                border: activeSection === 'security' ? '1px solid var(--warm-gold)' : '1px solid transparent',
                cursor: 'pointer',
                textAlign: 'left'
              }}
            >
              <Shield size={16} style={{ color: 'var(--warm-gold)' }} />
              <span>Security & 2FA</span>
            </button>

            <button
              onClick={() => setActiveSection('preferences')}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '10px',
                padding: '10px 14px',
                borderRadius: 'var(--radius-sm)',
                fontSize: '14px',
                fontWeight: activeSection === 'preferences' ? 600 : 500,
                color: activeSection === 'preferences' ? 'var(--deep-olive)' : 'var(--text-muted)',
                backgroundColor: activeSection === 'preferences' ? 'var(--dusky-ivory)' : 'transparent',
                border: activeSection === 'preferences' ? '1px solid var(--warm-gold)' : '1px solid transparent',
                cursor: 'pointer',
                textAlign: 'left'
              }}
            >
              <Sparkles size={16} style={{ color: 'var(--warm-gold)' }} />
              <span>Stay Preferences</span>
            </button>
          </div>
        </Card>

        {/* Right Content Area */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '28px' }}>
          {/* Profile Banner */}
          <Card style={{ padding: '24px 32px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '24px', flexWrap: 'wrap' }}>
              <div style={{ position: 'relative' }}>
                <img
                  src={user?.avatar || `https://ui-avatars.com/api/?name=${encodeURIComponent((user?.fullName || `${user?.firstName || 'Guest'} ${user?.lastName || ''}`.trim()))}&background=5f5c3a&color=ffffff&size=200`}
                  alt="Profile Avatar"
                  style={{
                    width: '80px',
                    height: '80px',
                    borderRadius: '50%',
                    objectFit: 'cover',
                    border: '3px solid var(--warm-gold)',
                    boxShadow: '0 4px 12px rgba(0,0,0,0.1)'
                  }}
                />
                <button
                  onClick={() => showToast('gold', 'Avatar change simulator: Updated photo.')}
                  style={{
                    position: 'absolute',
                    bottom: '0',
                    right: '0',
                    backgroundColor: 'var(--deep-olive)',
                    color: 'var(--warm-gold)',
                    border: '2px solid #FFFFFF',
                    width: '28px',
                    height: '28px',
                    borderRadius: '50%',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    cursor: 'pointer'
                  }}
                  aria-label="Change avatar"
                >
                  <Camera size={14} />
                </button>
              </div>

              <div>
                <h2 style={{ fontFamily: 'var(--font-display)', fontSize: '24px', fontWeight: 600, color: 'var(--deep-olive)' }}>
                  {profileData.firstName} {profileData.lastName}
                </h2>
                <span style={{ fontSize: '13.5px', color: 'var(--text-muted)' }}>{profileData.email}</span>
                <div style={{ display: 'flex', gap: '8px', marginTop: '8px' }}>
                  <span style={{ fontSize: '11px', fontWeight: 700, backgroundColor: 'rgba(236, 189, 114, 0.2)', border: '1px solid var(--warm-gold)', color: 'var(--deep-olive)', padding: '2px 8px', borderRadius: '4px' }}>
                    ✦ SAGA Royal Member
                  </span>
                </div>
              </div>
            </div>
          </Card>

          {/* Section 1: Personal Information */}
          <Card style={{ padding: '28px 32px' }}>
            <h3 style={{ fontFamily: 'var(--font-display)', fontSize: '20px', fontWeight: 600, color: 'var(--deep-olive)', marginBottom: '20px', display: 'flex', alignItems: 'center', gap: '8px' }}>
              <User size={18} style={{ color: 'var(--warm-gold)' }} />
              Personal Information
            </h3>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px', marginBottom: '20px' }} className="form-row-2col">
              <div>
                <label className="form-label">First Name</label>
                <input
                  type="text"
                  className="input-control"
                  value={profileData.firstName}
                  onChange={(e) => setProfileData({ ...profileData, firstName: e.target.value })}
                />
              </div>
              <div>
                <label className="form-label">Last Name</label>
                <input
                  type="text"
                  className="input-control"
                  value={profileData.lastName}
                  onChange={(e) => setProfileData({ ...profileData, lastName: e.target.value })}
                />
              </div>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px', marginBottom: '20px' }} className="form-row-2col">
              <div>
                <label className="form-label">Email Address</label>
                <input
                  type="email"
                  className="input-control"
                  value={profileData.email}
                  onChange={(e) => setProfileData({ ...profileData, email: e.target.value })}
                />
              </div>
              <div>
                <label className="form-label">Phone Number</label>
                <input
                  type="tel"
                  className="input-control"
                  value={profileData.phoneNumber}
                  onChange={(e) => setProfileData({ ...profileData, phoneNumber: e.target.value })}
                />
              </div>
            </div>

            <div>
              <label className="form-label">Residential Address</label>
              <input
                type="text"
                className="input-control"
                value={profileData.address}
                onChange={(e) => setProfileData({ ...profileData, address: e.target.value })}
              />
            </div>
          </Card>

          {/* Section 2: Security & 2FA */}
          <Card style={{ padding: '28px 32px' }}>
            <h3 style={{ fontFamily: 'var(--font-display)', fontSize: '20px', fontWeight: 600, color: 'var(--deep-olive)', marginBottom: '20px', display: 'flex', alignItems: 'center', gap: '8px' }}>
              <Shield size={18} style={{ color: 'var(--warm-gold)' }} />
              Security & Authentication
            </h3>

            {/* Password Row */}
            <div
              style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                padding: '16px 20px',
                backgroundColor: 'var(--bg-card-warm)',
                borderRadius: 'var(--radius-sm)',
                border: '1px solid var(--border-light)',
                marginBottom: '16px',
                flexWrap: 'wrap',
                gap: '12px'
              }}
            >
              <div>
                <div style={{ fontWeight: 600, fontSize: '14.5px', color: 'var(--deep-olive)' }}>Account Password</div>
                <div style={{ fontSize: '12.5px', color: 'var(--text-muted)' }}>Last changed 2 months ago</div>
              </div>
              <Button variant="outline" size="sm" onClick={() => setIsPasswordModalOpen(true)}>
                Update Password
              </Button>
            </div>

            {/* 2FA Box */}
            <div
              style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                padding: '16px 20px',
                backgroundColor: 'var(--bg-card-warm)',
                borderRadius: 'var(--radius-sm)',
                border: '1px solid var(--border-light)',
                flexWrap: 'wrap',
                gap: '12px'
              }}
            >
              <div>
                <div style={{ fontWeight: 600, fontSize: '14.5px', color: 'var(--deep-olive)' }}>
                  Two-Factor Authentication (2FA)
                </div>
                <div style={{ fontSize: '12.5px', color: 'var(--text-muted)' }}>
                  {twoFaEnabled
                    ? '2FA is currently active on your account.'
                    : 'Add an extra layer of royal protection to your account.'}
                </div>
              </div>
              <Button
                variant={twoFaEnabled ? 'red' : 'primary'}
                size="sm"
                onClick={() => {
                  setTwoFaEnabled(!twoFaEnabled);
                  showToast('gold', !twoFaEnabled ? 'Two-Factor Authentication activated.' : '2FA disabled.');
                }}
              >
                {twoFaEnabled ? 'Disable 2FA' : 'Enable 2FA'}
              </Button>
            </div>
          </Card>

          {/* Section 3: Travel Preferences */}
          <Card style={{ padding: '28px 32px' }}>
            <h3 style={{ fontFamily: 'var(--font-display)', fontSize: '20px', fontWeight: 600, color: 'var(--deep-olive)', marginBottom: '8px', display: 'flex', alignItems: 'center', gap: '8px' }}>
              <Sparkles size={18} style={{ color: 'var(--warm-gold)' }} />
              Personalized Stay Preferences
            </h3>
            <p style={{ fontSize: '13px', color: 'var(--text-muted)', marginBottom: '20px' }}>
              We use these selections to curate your arrivals, room setup, and royal dining suggestions.
            </p>

            {/* Suite Category */}
            <div style={{ marginBottom: '20px' }}>
              <span style={{ fontSize: '13px', fontWeight: 600, color: 'var(--deep-olive)', display: 'flex', alignItems: 'center', gap: '6px', marginBottom: '8px' }}>
                <Bed size={15} style={{ color: 'var(--warm-gold)' }} /> Room & Suite
              </span>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
                {allRoomOptions.map((item) => {
                  const isChecked = preferences.room.includes(item);
                  return (
                    <button
                      key={item}
                      type="button"
                      onClick={() => togglePreference('room', item)}
                      style={{
                        padding: '6px 14px',
                        borderRadius: 'var(--radius-full)',
                        fontSize: '12.5px',
                        fontWeight: 500,
                        cursor: 'pointer',
                        border: isChecked ? '1px solid var(--deep-olive)' : '1px solid var(--border-medium)',
                        backgroundColor: isChecked ? 'var(--deep-olive)' : '#FFFFFF',
                        color: isChecked ? 'var(--dusky-ivory)' : 'var(--text-main)',
                        display: 'inline-flex',
                        alignItems: 'center',
                        gap: '6px'
                      }}
                    >
                      {isChecked && <Check size={12} />}
                      <span>{item}</span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Dining Category */}
            <div style={{ marginBottom: '20px' }}>
              <span style={{ fontSize: '13px', fontWeight: 600, color: 'var(--deep-olive)', display: 'flex', alignItems: 'center', gap: '6px', marginBottom: '8px' }}>
                <Utensils size={15} style={{ color: 'var(--warm-gold)' }} /> Dining & Dietary
              </span>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
                {allDiningOptions.map((item) => {
                  const isChecked = preferences.dining.includes(item);
                  return (
                    <button
                      key={item}
                      type="button"
                      onClick={() => togglePreference('dining', item)}
                      style={{
                        padding: '6px 14px',
                        borderRadius: 'var(--radius-full)',
                        fontSize: '12.5px',
                        fontWeight: 500,
                        cursor: 'pointer',
                        border: isChecked ? '1px solid var(--deep-olive)' : '1px solid var(--border-medium)',
                        backgroundColor: isChecked ? 'var(--deep-olive)' : '#FFFFFF',
                        color: isChecked ? 'var(--dusky-ivory)' : 'var(--text-main)',
                        display: 'inline-flex',
                        alignItems: 'center',
                        gap: '6px'
                      }}
                    >
                      {isChecked && <Check size={12} />}
                      <span>{item}</span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Wellness Category */}
            <div>
              <span style={{ fontSize: '13px', fontWeight: 600, color: 'var(--deep-olive)', display: 'flex', alignItems: 'center', gap: '6px', marginBottom: '8px' }}>
                <Sparkles size={15} style={{ color: 'var(--warm-gold)' }} /> Wellness & Activities
              </span>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
                {allWellnessOptions.map((item) => {
                  const isChecked = preferences.wellness.includes(item);
                  return (
                    <button
                      key={item}
                      type="button"
                      onClick={() => togglePreference('wellness', item)}
                      style={{
                        padding: '6px 14px',
                        borderRadius: 'var(--radius-full)',
                        fontSize: '12.5px',
                        fontWeight: 500,
                        cursor: 'pointer',
                        border: isChecked ? '1px solid var(--deep-olive)' : '1px solid var(--border-medium)',
                        backgroundColor: isChecked ? 'var(--deep-olive)' : '#FFFFFF',
                        color: isChecked ? 'var(--dusky-ivory)' : 'var(--text-main)',
                        display: 'inline-flex',
                        alignItems: 'center',
                        gap: '6px'
                      }}
                    >
                      {isChecked && <Check size={12} />}
                      <span>{item}</span>
                    </button>
                  );
                })}
              </div>
            </div>
          </Card>

          {/* Action Buttons */}
          <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '14px', marginTop: '8px' }}>
            <Button variant="secondary" size="md" icon={<Undo size={16} />} onClick={handleDiscard}>
              Discard Changes
            </Button>
            <Button variant="primary" size="md" icon={<Save size={16} />} onClick={handleSave}>
              Save Preferences
            </Button>
          </div>
        </div>
      </div>

      {/* Password Update Modal */}
      <Modal
        isOpen={isPasswordModalOpen}
        onClose={() => setIsPasswordModalOpen(false)}
        title="Update Account Password"
        subtitle="Ensure your new password contains at least 8 characters."
      >
        <form onSubmit={handlePasswordUpdate}>
          <div style={{ marginBottom: '14px' }}>
            <label className="form-label">Current Password</label>
            <input
              type="password"
              className="input-control"
              value={passwordForm.current}
              onChange={(e) => setPasswordForm({ ...passwordForm, current: e.target.value })}
              required
            />
          </div>
          <div style={{ marginBottom: '14px' }}>
            <label className="form-label">New Password</label>
            <input
              type="password"
              className="input-control"
              value={passwordForm.newPass}
              onChange={(e) => setPasswordForm({ ...passwordForm, newPass: e.target.value })}
              required
            />
          </div>
          <div style={{ marginBottom: '24px' }}>
            <label className="form-label">Confirm New Password</label>
            <input
              type="password"
              className="input-control"
              value={passwordForm.confirm}
              onChange={(e) => setPasswordForm({ ...passwordForm, confirm: e.target.value })}
              required
            />
          </div>

          <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '12px' }}>
            <Button variant="secondary" size="md" onClick={() => setIsPasswordModalOpen(false)}>
              Cancel
            </Button>
            <Button type="submit" variant="primary" size="md">
              Update Password
            </Button>
          </div>
        </form>
      </Modal>
    </div>
  );
}
