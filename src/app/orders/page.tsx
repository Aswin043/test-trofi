"use client";

import React from 'react';
import { Trash2, ShoppingBag, MapPin, User } from 'lucide-react';
import { useRouter } from 'next/navigation';

export default function OrdersPage() {
  const router = useRouter();
  
  const orders = [
    {
      id: 1,
      restaurant: "Kichi Kichi",
      image: "/images/kichikichi.jpg",
      items: 2,
      price: "A$20.25",
      date: "29 Aug",
      status: "Completed"
    },
    {
      id: 2,
      restaurant: "John's Pizzeria",
      image: "/images/johnspizzeria.jpg",
      items: 1,
      price: "A$8.95",
      date: "25 Aug",
      status: "Completed"
    },
    {
      id: 3,
      restaurant: "Kebab Halal",
      image: "/images/halalkebab.jpg",
      items: 3,
      price: "A$10.43",
      date: "22 Aug",
      status: "Completed"
    },
    {
      id: 4,
      restaurant: "Pure Veg Rasoi",
      image: "/images/purevegrasoi.jpg",
      items: 2,
      price: "A$12.43",
      date: "18 Aug",
      status: "Completed"
    },
    {
      id: 5,
      restaurant: "Lee's Dumpling",
      image: "/images/leesdumplings.jpg",
      items: 4,
      price: "A$20.78",
      date: "13 Aug",
      status: "Completed"
    },
    {
      id: 6,
      restaurant: "Chai ki Tapri",
      image: "/images/dollykitapri.jpg",
      items: 2,
      price: "A$5.13",
      date: "9 Aug",
      status: "Completed"
    }
  ];

  return (
    <div style={{
      display: 'flex',
      flexDirection: 'column',
      minHeight: '100vh',
      backgroundColor: 'white',
      width: '100%',
      fontFamily: 'system-ui, -apple-system, sans-serif'
    }}>
      {/* Header */}
      <div style={{
        display: 'flex',
        flexDirection: 'column',
        padding: '1.25rem 1rem 0.75rem 1rem'
      }}>
        <h1 style={{
          fontSize: '2rem',
          fontWeight: 'bold',
          color: 'black',
          margin: 0,
          marginBottom: '0.25rem'
        }}>Orders</h1>
        
        <div style={{
          display: 'flex',
          alignItems: 'center',
          gap: '0.5rem',
          marginBottom: '0.5rem'
        }}>
          <Trash2 style={{ width: '1.125rem', height: '1.125rem', color: 'black' }} />
          <span style={{
            fontSize: '0.95rem',
            color: 'black'
          }}>Past Orders</span>
        </div>
        
        <div style={{
          height: '1px',
          backgroundColor: 'black',
          width: '100%'
        }}></div>
      </div>

      {/* Orders List */}
      <div style={{
        display: 'flex',
        flexDirection: 'column',
        flex: 1,
        padding: '0 1rem'
      }}>
        {orders.map((order) => (
          <div key={order.id} style={{
            display: 'flex',
            alignItems: 'center',
            padding: '1rem 0',
            borderBottom: '1px solid #f3f4f6'
          }}>
            {/* Food Image */}
            <div style={{
              width: '3.5rem',
              height: '3.5rem',
              borderRadius: '50%',
              overflow: 'hidden',
              marginRight: '0.875rem',
              flexShrink: 0
            }}>
              <img 
                src={order.image} 
                alt={order.restaurant}
                style={{
                  width: '100%',
                  height: '100%',
                  objectFit: 'cover'
                }}
              />
            </div>

            {/* Order Details */}
            <div style={{
              flex: 1,
              display: 'flex',
              flexDirection: 'column'
            }}>
              <h3 style={{
                fontSize: '1rem',
                fontWeight: 'bold',
                color: 'black',
                margin: 0,
                marginBottom: '0.25rem'
              }}>{order.restaurant}</h3>
              
              <p style={{
                fontSize: '0.875rem',
                color: '#6b7280',
                margin: 0,
                marginBottom: '0.25rem'
              }}>{order.items} items • {order.price}</p>
              
              <p style={{
                fontSize: '0.875rem',
                color: '#6b7280',
                margin: 0
              }}>{order.date} • {order.status}</p>
            </div>

            {/* Reorder Button */}
            <button style={{
              backgroundColor: '#f3f4f6',
              color: 'black',
              border: 'none',
              borderRadius: '0.375rem',
              padding: '0.375rem 0.75rem',
              fontSize: '0.8rem',
              fontWeight: '500',
              cursor: 'pointer',
              flexShrink: 0
            }}>
              Reorder
            </button>
          </div>
        ))}
      </div>

      {/* Bottom Navigation */}
      <div style={{
        position: 'fixed',
        bottom: 0,
        left: 0,
        right: 0,
        width: '100%',
        backgroundColor: 'white',
        borderTop: '1px solid #e5e7eb',
        padding: '1rem'
      }}>
        <div style={{
          display: 'flex',
          justifyContent: 'space-around',
          alignItems: 'center'
        }}>
          <button 
            onClick={() => router.push('/orders')}
            style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              gap: '0.25rem',
              backgroundColor: '#f3f4f6',
              border: 'none',
              borderRadius: '0.5rem',
              padding: '0.5rem',
              cursor: 'pointer'
            }}
          >
            <ShoppingBag style={{ width: '1.5rem', height: '1.5rem', color: 'black' }} />
          </button>
          
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
          
          <button style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: '0.25rem',
            border: 'none',
            padding: '0.5rem',
            cursor: 'pointer'
          }}>
            <User style={{ width: '1.5rem', height: '1.5rem', color: '#6b7280' }} />
          </button>
        </div>
      </div>

      {/* Bottom spacing for navigation */}
      <div style={{ height: '5rem' }}></div>
    </div>
  );
}
