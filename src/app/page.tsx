"use client";

import { useEffect, useRef, useState } from "react";

declare global {
  interface Window {
    google: any;
    restaurantMarkers: google.maps.Marker[];
  }
}

export default function Home() {
  const mapContainer = useRef<HTMLDivElement>(null);
  const map = useRef<google.maps.Map | null>(null);
  const [userLocation, setUserLocation] = useState<google.maps.LatLngLiteral | null>(null);
  const [locationError, setLocationError] = useState<string | null>(null);
  const [mapLoaded, setMapLoaded] = useState(false);

  // Sample restaurant data with leftover food
  const generateRestaurantsNearLocation = (centerLat: number, centerLng: number) => {
    // Generate random offsets within a small radius (about 0.01 degrees = roughly 1km)
    const generateOffset = () => (Math.random() - 0.5) * 0.01;
    
    return [
      {
        name: "Joe's Pizza",
        position: { 
          lat: centerLat + generateOffset(), 
          lng: centerLng + generateOffset() 
        },
        leftoverFood: "Margherita Pizza, Pepperoni Slices",
        discount: "50% off",
        pickupTime: "8:00 PM - 9:00 PM"
      },
      {
        name: "Burger Palace",
        position: { 
          lat: centerLat + generateOffset(), 
          lng: centerLng + generateOffset() 
        },
        leftoverFood: "Cheeseburgers, French Fries",
        discount: "40% off",
        pickupTime: "7:30 PM - 8:30 PM"
      },
      {
        name: "Sushi Express",
        position: { 
          lat: centerLat + generateOffset(), 
          lng: centerLng + generateOffset() 
        },
        leftoverFood: "California Rolls, Salmon Nigiri",
        discount: "60% off",
        pickupTime: "8:30 PM - 9:30 PM"
      },
      {
        name: "Taco Fiesta",
        position: { 
          lat: centerLat + generateOffset(), 
          lng: centerLng + generateOffset() 
        },
        leftoverFood: "Beef Tacos, Chicken Quesadillas",
        discount: "45% off",
        pickupTime: "7:00 PM - 8:00 PM"
      },
      {
        name: "Pasta House",
        position: { 
          lat: centerLat + generateOffset(), 
          lng: centerLng + generateOffset() 
        },
        leftoverFood: "Spaghetti Carbonara, Fettuccine Alfredo",
        discount: "55% off",
        pickupTime: "8:15 PM - 9:15 PM"
      },
      {
        name: "Subway Deli",
        position: { 
          lat: centerLat + generateOffset(), 
          lng: centerLng + generateOffset() 
        },
        leftoverFood: "Turkey Subs, Veggie Wraps",
        discount: "35% off",
        pickupTime: "7:45 PM - 8:45 PM"
      },
      {
        name: "Chinese Kitchen",
        position: { 
          lat: centerLat + generateOffset(), 
          lng: centerLng + generateOffset() 
        },
        leftoverFood: "Kung Pao Chicken, Fried Rice",
        discount: "55% off",
        pickupTime: "8:00 PM - 9:00 PM"
      },
      {
        name: "Coffee Corner",
        position: { 
          lat: centerLat + generateOffset(), 
          lng: centerLng + generateOffset() 
        },
        leftoverFood: "Pastries, Sandwiches",
        discount: "70% off",
        pickupTime: "6:30 PM - 7:30 PM"
      }
    ];
  };

  const [restaurants, setRestaurants] = useState<any[]>([]);

  // Get user location
  const getUserLocation = () => {
    if ("geolocation" in navigator) {
      console.log('Requesting user location...');
      
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const location: google.maps.LatLngLiteral = {
            lat: position.coords.latitude,
            lng: position.coords.longitude
          };
          
          console.log('Location obtained:', location);
          setUserLocation(location);
          
          // Generate restaurants near user location
          const nearbyRestaurants = generateRestaurantsNearLocation(location.lat, location.lng);
          setRestaurants(nearbyRestaurants);
          console.log('Generated restaurants near user location:', nearbyRestaurants);
          
          // If map is already loaded, center on user location
          if (map.current && mapLoaded) {
            console.log('Centering map on user location...');
            
            // Use panTo for smooth animation to user location
            map.current.panTo(location);
            map.current.setZoom(16);
            
            // Add user location marker
            new google.maps.Marker({
              position: location,
              map: map.current,
              icon: {
                path: google.maps.SymbolPath.CIRCLE,
                scale: 10,
                fillColor: '#10b981',
                fillOpacity: 1,
                strokeColor: '#ffffff',
                strokeWeight: 3
              },
              title: 'Your Location'
            });
            
            console.log('Map centered on user location');
          } else {
            console.log('Map not ready yet, will center when loaded');
          }
        },
        (error) => {
          console.error("Error getting location:", error);
          
          let errorMessage = "Unable to get your location";
          switch (error.code) {
            case error.PERMISSION_DENIED:
              errorMessage = "Location permission denied. Please enable location access.";
              break;
            case error.POSITION_UNAVAILABLE:
              errorMessage = "Location information unavailable.";
              break;
            case error.TIMEOUT:
              errorMessage = "Location request timed out.";
              break;
            default:
              errorMessage = "Unknown location error occurred.";
              break;
          }
          
          setLocationError(errorMessage);
          console.log('Location error details:', errorMessage);
        },
        {
          enableHighAccuracy: true,
          timeout: 15000, // Increased timeout to 15 seconds
          maximumAge: 300000 // 5 minutes cache
        }
      );
    } else {
      const errorMessage = "Geolocation not supported by this browser";
      console.error(errorMessage);
      setLocationError(errorMessage);
    }
  };

  // Add restaurant markers to the map
  const addRestaurantMarkers = () => {
    if (!map.current || restaurants.length === 0) return;

    // Clear existing restaurant markers
    if (window.restaurantMarkers) {
      window.restaurantMarkers.forEach(marker => marker.setMap(null));
    }
    
    window.restaurantMarkers = [];

    restaurants.forEach((restaurant) => {
      // Create big red restaurant marker
      const marker = new google.maps.Marker({
        position: restaurant.position,
        map: map.current,
        title: restaurant.name,
        icon: {
          path: google.maps.SymbolPath.CIRCLE,
          scale: 15, // Big size
          fillColor: '#ef4444', // Red color
          fillOpacity: 1,
          strokeColor: '#ffffff',
          strokeWeight: 3
        }
      });

      // Store marker reference
      window.restaurantMarkers.push(marker);

      // Create info window content
      const infoWindowContent = `
        <div style="padding: 16px; max-width: 300px; font-family: Arial, sans-serif;">
          <h3 style="margin: 0 0 12px 0; color: #1f2937; font-size: 18px; font-weight: 600;">
            🍕 ${restaurant.name}
          </h3>
          <div style="margin-bottom: 12px;">
            <p style="margin: 0 0 8px 0; color: #6b7280; font-size: 14px;">
              <strong>Leftover Food:</strong>
            </p>
            <p style="margin: 0; color: #374151; font-size: 14px; line-height: 1.4;">
              ${restaurant.leftoverFood}
            </p>
          </div>
          <div style="margin-bottom: 12px;">
            <p style="margin: 0 0 8px 0; color: #6b7280; font-size: 14px;">
              <strong>Discount:</strong>
            </p>
            <p style="margin: 0; color: #059669; font-size: 16px; font-weight: 600;">
              ${restaurant.discount}
            </p>
          </div>
          <div style="margin-bottom: 0;">
            <p style="margin: 0 0 8px 0; color: #6b7280; font-size: 14px;">
              <strong>Pickup Time:</strong>
            </p>
            <p style="margin: 0; color: #dc2626; font-size: 14px; font-weight: 500;">
              ⏰ ${restaurant.pickupTime}
            </p>
          </div>
        </div>
      `;

      const infoWindow = new google.maps.InfoWindow({
        content: infoWindowContent,
        maxWidth: 350
      });

      // Add click listener to marker
      marker.addListener('click', () => {
        infoWindow.open(map.current, marker);
      });
    });
  };

  // Initialize Google Maps
  useEffect(() => {
    // Load Google Maps script
    const loadGoogleMaps = () => {
      if (window.google && window.google.maps) {
        initializeMap();
        return;
      }

      const script = document.createElement('script');
      script.src = `https://maps.googleapis.com/maps/api/js?key=AIzaSyBxN29TEo8SEzFGqwR2LAp3XvlquPAsCO4&libraries=places,geometry`;
      script.async = true;
      script.defer = true;
      script.onload = initializeMap;
      script.onerror = () => {
        console.error('Failed to load Google Maps');
        setLocationError('Failed to load Google Maps');
      };
      document.head.appendChild(script);
    };

    const initializeMap = () => {
      if (!mapContainer.current || map.current) return;

      // Default location (New York City)
      const defaultLocation: google.maps.LatLngLiteral = { lat: 40.7128, lng: -74.0060 };

      // Create map
      map.current = new google.maps.Map(mapContainer.current, {
        center: userLocation || defaultLocation,
        zoom: userLocation ? 16 : 12, // Higher zoom if user location is available
        mapTypeId: google.maps.MapTypeId.ROADMAP,
        mapTypeControl: false,
        streetViewControl: false,
        fullscreenControl: false,
        zoomControl: false,
        gestureHandling: 'cooperative',
        styles: [
          {
            featureType: 'poi',
            elementType: 'labels',
            stylers: [{ visibility: 'off' }]
          }
        ]
      });

      setMapLoaded(true);
      
      // Add restaurant markers
      addRestaurantMarkers();
      
      // If we already have user location, center the map immediately
      if (userLocation) {
        // Small delay to ensure map is fully rendered
        setTimeout(() => {
          if (map.current) {
            console.log('Centering map on existing user location...');
            map.current.panTo(userLocation);
            map.current.setZoom(16);
            
            // Add user location marker
            new google.maps.Marker({
              position: userLocation,
              map: map.current,
              icon: {
                path: google.maps.SymbolPath.CIRCLE,
                scale: 10,
                fillColor: '#10b981',
                fillOpacity: 1,
                strokeColor: '#ffffff',
                strokeWeight: 3
              },
              title: 'Your Location'
            });
            
            console.log('Map centered on user location');
          }
        }, 500);
      } else {
        // Get user location after map is loaded
        console.log('Getting user location after map load...');
        getUserLocation();
      }
    };

    loadGoogleMaps();

    return () => {
      if (map.current) {
        // Clean up map
        google.maps.event.clearInstanceListeners(map.current);
      }
    };
  }, [userLocation]);

  // Watch for map loading and center on user location if available
  useEffect(() => {
    if (mapLoaded && map.current && userLocation) {
      console.log('Map loaded, centering on user location...');
      
      // Use panTo for smooth animation
      map.current.panTo(userLocation);
      map.current.setZoom(16);
      
      // Add user location marker if not already present
      new google.maps.Marker({
        position: userLocation,
        map: map.current,
        icon: {
          path: google.maps.SymbolPath.CIRCLE,
          scale: 10,
          fillColor: '#10b981',
          fillOpacity: 1,
          strokeColor: '#ffffff',
          strokeWeight: 3
        },
        title: 'Your Location'
      });
      
      console.log('Map successfully centered on user location');
    }
    
    // Add restaurant markers when map is loaded
    if (mapLoaded && map.current) {
      addRestaurantMarkers();
    }
  }, [mapLoaded, userLocation]);

  // Watch for restaurant changes and update markers
  useEffect(() => {
    if (mapLoaded && map.current && restaurants.length > 0) {
      console.log('Restaurants updated, refreshing markers...');
      addRestaurantMarkers();
    }
  }, [restaurants, mapLoaded]);

  return (
    <div className="w-full h-screen">
      <div 
        ref={mapContainer} 
        className="w-full h-full"
      />
    </div>
  );
}
