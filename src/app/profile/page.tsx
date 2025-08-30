"use client";

import React from 'react';
import { Settings, User, Filter, LogOut, ShoppingBag, MapPin } from 'lucide-react';
import { useRouter } from 'next/navigation';

export default function ProfilePage() {
  const router = useRouter();

  const menuItems = [
    {
      id: 1,
      icon: <Settings style={{ width: '1.5rem', height: '1.5rem', color: 'black' }} />,
      text: "Settings"
    },
    {
      id: 2,
      icon: <User style={{ width: '1.5rem', height: '1.5rem', color: 'black' }} />,
      text: "Edit Profile"
    },
    {
      id: 3,
      icon: <Filter style={{ width: '1.5rem', height: '1.5rem', color: 'black' }} />,
      text: "Preferences"
    },
    {
      id: 4,
      icon: <LogOut style={{ width: '1.5rem', height: '1.5rem', color: 'black' }} />,
      text: "Log Out"
    }
  ];

  return (
    <div style={{
      display: 'flex',
      flexDirection: 'column',
      minHeight: '100vh',
      fontFamily: 'system-ui, -apple-system, sans-serif'
    }}>
      <style jsx>{`
        @keyframes pulse {
          0% {
            transform: translate(-50%, -50%) scale(1);
            opacity: 0.6;
          }
          16% {
            transform: translate(-70%, -30%) scale(1.2);
            opacity: 0.7;
          }
          32% {
            transform: translate(-30%, -70%) scale(1.1);
            opacity: 0.8;
          }
          48% {
            transform: translate(-70%, -70%) scale(1.3);
            opacity: 0.6;
          }
          64% {
            transform: translate(-30%, -30%) scale(1.1);
            opacity: 0.7;
          }
          80% {
            transform: translate(-80%, -20%) scale(1.2);
            opacity: 0.8;
          }
          100% {
            transform: translate(-50%, -50%) scale(1);
            opacity: 0.6;
          }
        }
      `}</style>
      {/* Top Profile Section - Dark Gray */}
      <div style={{
        backgroundColor: '#333333',
        padding: '4rem 1rem 3rem 1rem',
        position: 'relative',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center'
      }}>
        {/* Settings Gear Icon - Top Right */}
        <div style={{
          position: 'absolute',
          top: '1rem',
          right: '1rem'
        }}>
          <Settings style={{ width: '1.5rem', height: '1.5rem', color: 'white' }} />
        </div>

        {/* Profile Picture with Animated Orange Glow */}
        <div style={{
          position: 'relative',
          marginBottom: '1rem'
        }}>
          {/* Animated Orange Glow Background */}
          <div style={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            width: '16rem',
            height: '16rem',
            borderRadius: '50%',
            background: 'radial-gradient(circle, rgba(251, 191, 36, 0.6) 0%, rgba(251, 191, 36, 0.3) 50%, rgba(251, 191, 36, 0.1) 100%)',
            filter: 'blur(20px)',
            animation: 'pulse 10s ease-in-out infinite',
            zIndex: 1
          }}></div>
          
          {/* Profile Picture */}
          <div style={{
            width: '8rem',
            height: '8rem',
            borderRadius: '50%',
            border: '2px solid black',
            overflow: 'hidden',
            position: 'relative',
            zIndex: 2
          }}>
            <img
              src="/images/shinchan.jpg"
              alt="Shin Chan"
              style={{
                width: '100%',
                height: '100%',
                objectFit: 'cover'
              }}
            />
          </div>
        </div>

        {/* User Name */}
        <h1 style={{
          fontSize: '2rem',
          fontWeight: 'bold',
          color: 'white',
          margin: 0,
          marginBottom: '0.5rem'
        }}>
          Shin Chan
        </h1>

        {/* User Email */}
        <p style={{
          fontSize: '1rem',
          color: 'white',
          margin: 0,
          opacity: 0.9
        }}>
          shinchan@gmail.com
        </p>
      </div>

      {/* Curved Transition */}
      <div style={{
        backgroundColor: '#333333',
        height: '8rem',
        position: 'relative'
      }}>
        <div style={{
          position: 'absolute',
          bottom: 0,
          left: 0,
          right: 0,
          height: '2rem',
          backgroundColor: '#f9fafb',
          borderTopLeftRadius: '2rem',
          borderTopRightRadius: '2rem'
        }}></div>
      </div>

      {/* Menu Section - Light Background */}
      <div style={{
        backgroundColor: '#f9fafb',
        flex: 1,
        padding: '1rem 1rem 0 1rem'
      }}>
        {menuItems.map((item) => (
          <button
            key={item.id}
            style={{
              width: '100%',
              display: 'flex',
              alignItems: 'center',
              gap: '1rem',
              padding: '0.75rem',
              backgroundColor: 'white',
              border: 'none',
              borderRadius: '0.75rem',
              marginBottom: '0.75rem',
              boxShadow: '0 4px 6px rgba(0, 0, 0, 0.05)',
              cursor: 'pointer',
              transition: 'all 0.2s ease'
            }}
            onMouseEnter={(e) => {
              const target = e.target as HTMLElement;
              target.style.transform = 'translateY(-2px)';
              target.style.boxShadow = '0 8px 15px rgba(0, 0, 0, 0.1)';
            }}
            onMouseLeave={(e) => {
              const target = e.target as HTMLElement;
              target.style.transform = 'translateY(0)';
              target.style.boxShadow = '0 4px 6px rgba(0, 0, 0, 0.05)';
            }}
          >
            {item.icon}
            <span style={{
              fontSize: '1rem',
              fontWeight: '500',
              color: 'black'
            }}>
              {item.text}
            </span>
          </button>
        ))}
      </div>

      {/* Bottom Navigation - Consistent with other pages */}
      <div style={{
        position: 'fixed',
        bottom: '1.5rem',
        left: '50%',
        transform: 'translateX(-50%)',
        backgroundColor: 'rgba(255, 255, 255, 0.8)',
        backdropFilter: 'blur(20px)',
        borderRadius: '2rem',
        border: '1px solid rgba(255, 255, 255, 0.3)',
        padding: '1rem 2rem',
        boxShadow: '0 10px 25px rgba(0, 0, 0, 0.1)'
      }}>
        <div style={{
          display: 'flex',
          justifyContent: 'space-around',
          alignItems: 'center',
          gap: '2rem'
        }}>
          {/* Shopping Cart Icon */}
          <button
            onClick={() => router.push('/orders')}
            style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              gap: '0.25rem',
              border: 'none',
              padding: '0.5rem',
              cursor: 'pointer'
            }}
          >
            <ShoppingBag style={{ width: '1.5rem', height: '1.5rem', color: '#6b7280' }} />
          </button>

          {/* Map Pin Icon */}
          <button
            onClick={() => router.push('/')}
            style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              gap: '0.25rem',
              border: 'none',
              padding: '0.5rem',
              cursor: 'pointer'
            }}
          >
            <MapPin style={{ width: '1.5rem', height: '1.5rem', color: '#6b7280' }} />
          </button>

          {/* User Profile Icon - Active State */}
          <button style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: '0.25rem',
            backgroundColor: '#f3f4f6',
            border: 'none',
            borderRadius: '0.5rem',
            padding: '0.5rem',
            cursor: 'pointer'
          }}>
            <svg style={{ width: '1.5rem', height: '1.5rem', color: 'black' }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
            </svg>
          </button>
        </div>
      </div>

    </div>
  );
}
