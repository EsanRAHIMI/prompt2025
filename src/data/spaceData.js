// data/spaceData.js

// Destination data
export const destinations = [
    {
      id: 'orbit-1',
      name: 'Aurora Station',
      type: 'orbital',
      shortDescription: 'Experience the majesty of Earth from 400km above in this luxurious orbital hotel.',
      longDescription: 'Aurora Station offers breathtaking views of Earth, with panoramic windows providing unparalleled vistas of our blue planet. Experience zero gravity in comfort and style. The station completes an orbit every 90 minutes, meaning you\'ll witness 16 sunrises and sunsets daily.',
      altitude: '400km',
      travelTime: 5,
      imageUrl: '/images/aurora-station.jpg', // In a real app, these would be actual hosted images
      features: ['panoramic-views', 'zero-gravity-activities', 'premium-amenities', 'space-walks'],
      popularity: 95,
      rating: 4.8,
      pricingTiers: [
        {
          name: 'Economy',
          price: 95000,
          description: 'Basic orbital experience with shared accommodations.',
          features: [
            '4-day orbital stay',
            'Shared suite (4 guests)',
            'Daily space walk viewing',
            'Basic meal service',
            'Pre-flight training',
            'Launch and return transport'
          ],
          notIncluded: [
            'Private space walk',
            'Premium dining options',
            'Personal communication link'
          ]
        },
        {
          name: 'Business',
          price: 195000,
          description: 'Enhanced comfort with semi-private accommodations and premium amenities.',
          features: [
            '5-day orbital stay',
            'Semi-private suite (2 guests)',
            'One guided space walk',
            'Premium meal service',
            'Extended pre-flight training',
            'Launch and return transport',
            'Personal communication link',
            'Custom space suit fitting'
          ],
          notIncluded: [
            'Private quarters',
            'Unlimited Earth communications'
          ]
        },
        {
          name: 'Luxury',
          price: 350000,
          description: 'Ultimate orbital experience with private accommodations and exclusive services.',
          features: [
            '7-day orbital stay',
            'Private luxury suite',
            'Two guided space walks',
            'Gourmet dining experience',
            'Comprehensive pre-flight training',
            'Priority launch and return transport',
            'Unlimited Earth communications',
            'Personal concierge service',
            'Exclusive access to observation deck',
            'Custom space suit to keep'
          ]
        }
      ]
    },
    {
      id: 'orbit-2',
      name: 'Celestial Observatory',
      type: 'orbital',
      shortDescription: 'A scientific paradise orbiting at 420km with state-of-the-art astronomical equipment.',
      longDescription: 'The Celestial Observatory combines luxury with scientific discovery. Equipped with research-grade telescopes and instruments, guests can observe deep space objects and contribute to actual scientific research while enjoying premium accommodations.',
      altitude: '420km',
      travelTime: 7,
      imageUrl: '/images/celestial-observatory.jpg',
      features: ['research-facilities', 'telescope-access', 'science-workshops', 'panoramic-views'],
      popularity: 85,
      rating: 4.7,
      pricingTiers: [
        {
          name: 'Economy',
          price: 110000,
          description: 'Basic scientific orbital experience.',
          features: [
            '6-day orbital stay',
            'Shared quarters (4 guests)',
            'Basic astronomy equipment access',
            'Daily science workshops',
            'Standard meal service',
            'Pre-flight training',
            'Launch and return transport'
          ],
          notIncluded: [
            'Private research time',
            'Advanced equipment access',
            'Custom research agenda'
          ]
        },
        {
          name: 'Business',
          price: 225000,
          description: 'Enhanced scientific experience with semi-private accommodations.',
          features: [
            '7-day orbital stay',
            'Semi-private quarters (2 guests)',
            'Priority telescope time',
            'Advanced equipment access',
            'Private research consultation',
            'Premium meal service',
            'Enhanced pre-flight training',
            'Launch and return transport',
            'Data package of observations'
          ],
          notIncluded: [
            'Private quarters',
            'Unlimited research equipment access'
          ]
        },
        {
          name: 'Luxury',
          price: 395000,
          description: 'Ultimate scientific orbital experience with private facilities.',
          features: [
            '10-day orbital stay',
            'Private luxury quarters',
            'Unrestricted equipment access',
            'Personal research assistant',
            'Custom research agenda',
            'Gourmet dining experience',
            'Comprehensive training program',
            'Priority launch and return',
            'Full data package with analysis',
            'Co-authorship opportunity on research'
          ]
        }
      ]
    },
    {
      id: 'lunar-1',
      name: 'Tranquility Base Resort',
      type: 'lunar',
      shortDescription: 'Experience lunar luxury at the historic site of humanity\'s first Moon landing.',
      longDescription: 'Located near the historic Apollo 11 landing site, Tranquility Base Resort offers the ultimate lunar experience. Feel one-sixth of Earth\'s gravity as you explore the lunar surface, enjoy Earth-rise views, and stay in pressurized luxury accommodations built into the lunar regolith.',
      altitude: '384,400km',
      travelTime: 12,
      imageUrl: '/images/tranquility-base.jpg',
      features: ['lunar-walks', 'historic-site-access', 'premium-amenities', 'earth-views'],
      popularity: 92,
      rating: 4.9,
      pricingTiers: [
        {
          name: 'Economy',
          price: 250000,
          description: 'Essential lunar experience package.',
          features: [
            '10-day lunar journey',
            'Shared habitat (4 guests)',
            'One guided lunar surface walk',
            'Apollo 11 site viewing (distant)',
            'Basic meal service',
            'Required lunar training',
            'Transport to and from Earth'
          ],
          notIncluded: [
            'Private habitat',
            'Extended surface excursions',
            'Premium dining options'
          ]
        },
        {
          name: 'Business',
          price: 350000,
          description: 'Enhanced lunar stay with additional surface activities.',
          features: [
            '12-day lunar journey',
            'Semi-private habitat (2 guests)',
            'Three guided lunar surface walks',
            'Apollo 11 site close viewing',
            'Lunar rover excursion',
            'Premium meal service',
            'Comprehensive lunar training',
            'Transport to and from Earth',
            'Lunar photography package'
          ],
          notIncluded: [
            'Private habitat',
            'Customized excursions'
          ]
        },
        {
          name: 'Luxury',
          price: 450000,
          description: 'Ultimate lunar experience with private accommodations and exclusive excursions.',
          features: [
            '14-day lunar journey',
            'Private luxury habitat',
            'Unlimited guided lunar walks',
            'Exclusive Apollo 11 site access',
            'Extended rover expeditions',
            'Gourmet dining with Earth-view',
            'VIP lunar training program',
            'Priority Earth transport',
            'Personal lunar photographer',
            'Custom lunar samples collection',
            'Earthrise meditation sessions'
          ]
        }
      ]
    },
    {
      id: 'lunar-2',
      name: 'Lunar Highlands Retreat',
      type: 'lunar',
      shortDescription: 'An exclusive resort in the pristine lunar highlands with incredible Earth views.',
      longDescription: 'Perched on the edge of the Lunar Highlands, this exclusive retreat offers unparalleled views of Earth and the lunar landscape. The facility features transparent dome ceilings for stargazing from your suite, private regolith gardens, and some of the most dramatic landscapes on the Moon.',
      altitude: '384,400km',
      travelTime: 14,
      imageUrl: '/images/lunar-highlands.jpg',
      features: ['lunar-walks', 'premium-amenities', 'earth-views', 'space-activities'],
      popularity: 88,
      rating: 4.8,
      pricingTiers: [
        {
          name: 'Economy',
          price: 275000,
          description: 'Basic highland lunar experience.',
          features: [
            '12-day lunar journey',
            'Shared highland habitat (4 guests)',
            'Two guided highland treks',
            'Basic astronomy sessions',
            'Standard meal service',
            'Required lunar training',
            'Transport to and from Earth'
          ],
          notIncluded: [
            'Private dome suite',
            'Extended highland expeditions',
            'Premium dining options'
          ]
        },
        {
          name: 'Business',
          price: 375000,
          description: 'Premium highland experience with better accommodations.',
          features: [
            '14-day lunar journey',
            'Semi-private dome suite (2 guests)',
            'Four guided highland treks',
            'Private astronomy sessions',
            'Premium meal service',
            'Advanced lunar training',
            'Transport to and from Earth',
            'Highland photography package',
            'Meditation sessions under the stars'
          ],
          notIncluded: [
            'Private luxury dome',
            'Customized expeditions'
          ]
        },
        {
          name: 'Luxury',
          price: 475000,
          description: 'Ultimate highland retreat experience with exclusive accommodations.',
          features: [
            '16-day lunar journey',
            'Private luxury dome suite',
            'Unlimited guided highland treks',
            'Custom expedition planning',
            'Gourmet dining experience',
            'VIP lunar training',
            'Priority Earth transport',
            'Personal highland guide',
            'Exclusive stargazing observatory access',
            'Custom lunar art creation experience',
            'Lunar yoga and wellness program'
          ]
        }
      ]
    },
    {
      id: 'mars-1',
      name: 'Olympus Base',
      type: 'mars',
      shortDescription: 'The premiere Mars habitation at the base of Olympus Mons, the solar system\'s tallest mountain.',
      longDescription: 'Olympus Base sits at the foot of the majestic Olympus Mons, the tallest mountain in our solar system. This state-of-the-art facility offers the ultimate Martian adventure with expeditions to explore volcanic features, vast plains, and the mountain itself. Experience the frontier of human space exploration.',
      altitude: '225 million km',
      travelTime: 180,
      imageUrl: '/images/olympus-base.jpg',
      features: ['mars-expeditions', 'research-facilities', 'premium-amenities', 'space-activities'],
      popularity: 98,
      rating: 4.9,
      pricingTiers: [
        {
          name: 'Explorer',
          price: 350000,
          description: 'Basic Mars expedition with shared facilities.',
          features: [
            '180-day Mars journey (60 on Mars)',
            'Shared habitat (4 explorers)',
            'Weekly guided Mars walks',
            'Basic Olympus Mons expedition',
            'Research participation',
            'Standard Mars rations',
            'Extensive Mars training',
            'Transport to and from Earth'
          ],
          notIncluded: [
            'Private quarters',
            'Extended expeditions',
            'Premium food options'
          ]
        },
        {
          name: 'Voyager',
          price: 450000,
          description: 'Enhanced Mars experience with semi-private accommodations.',
          features: [
            '200-day Mars journey (80 on Mars)',
            'Semi-private habitat (2 explorers)',
            'Bi-weekly guided expeditions',
            'Advanced Olympus Mons trek',
            'Rover certification and usage',
            'Enhanced Mars cuisine',
            'Comprehensive Mars training',
            'Transport to and from Earth',
            'Scientific research collaboration',
            'Mars data and sample collection'
          ],
          notIncluded: [
            'Private luxury habitat',
            'Unlimited expeditions'
          ]
        },
        {
          name: 'Pioneer',
          price: 550000,
          description: 'Ultimate Mars experience with private facilities and exclusive expeditions.',
          features: [
            '220-day Mars journey (100 on Mars)',
            'Private luxury habitat',
            'Unlimited guided expeditions',
            'Custom expedition planning',
            'Private rover access',
            'Gourmet Mars-grown cuisine',
            'VIP Mars preparation program',
            'Priority Earth transport',
            'Personal expedition guide',
            'First-priority emergency evacuation',
            'Exclusive research opportunities',
            'Martian sunrise meditation sessions',
            'Commemorative Mars rock sample'
          ]
        }
      ]
    }
  ];
  
  // Upcoming launches data
  export const upcomingLaunches = [
    {
      id: 'launch-001',
      name: 'Aurora Mission',
      destinationType: 'orbital',
      description: 'Journey to Aurora Station on our state-of-the-art spacecraft.',
      date: '2025-04-15T09:00:00Z',
      availableSeats: 12,
      image: '/images/aurora-mission.jpg',
      launchSite: 'Dubai Spaceport',
      returnDate: '2025-04-20T16:00:00Z',
      discount: 0,
      preparation: {
        briefingDate: '2025-04-13T14:00:00Z',
        requiredDocuments: ['Passport', 'Medical Clearance', 'Liability Waiver']
      }
    },
    {
      id: 'launch-002',
      name: 'Celestial Explorer',
      destinationType: 'orbital',
      description: 'Scientific journey to the Celestial Observatory.',
      date: '2025-05-03T11:30:00Z',
      availableSeats: 8,
      image: '/images/celestial-explorer.jpg',
      launchSite: 'Dubai Spaceport',
      returnDate: '2025-05-10T13:00:00Z',
      discount: 10, // 10% discount
      preparation: {
        briefingDate: '2025-05-01T14:00:00Z',
        requiredDocuments: ['Passport', 'Medical Clearance', 'Liability Waiver', 'Scientific Background Check']
      }
    },
    {
      id: 'launch-003',
      name: 'Tranquility Voyage',
      destinationType: 'lunar',
      description: 'Historic journey to the Tranquility Base Resort on the Moon.',
      date: '2025-06-12T08:15:00Z',
      availableSeats: 6,
      image: '/images/tranquility-voyage.jpg',
      launchSite: 'Dubai Spaceport',
      returnDate: '2025-06-24T19:30:00Z',
      discount: 0,
      preparation: {
        briefingDate: '2025-06-10T10:00:00Z',
        requiredDocuments: ['Passport', 'Medical Clearance', 'Liability Waiver', 'Lunar Training Certificate'],
        requiredTraining: ['Zero-G Adaptation', 'Lunar Surface Operations', 'Emergency Procedures']
      }
    },
    {
      id: 'launch-004',
      name: 'Highlands Expedition',
      destinationType: 'lunar',
      description: 'Exclusive journey to the Lunar Highlands Retreat.',
      date: '2025-07-08T12:00:00Z',
      availableSeats: 4,
      image: '/images/highlands-expedition.jpg',
      launchSite: 'Dubai Spaceport',
      returnDate: '2025-07-22T15:45:00Z',
      discount: 15, // 15% discount for early booking
      preparation: {
        briefingDate: '2025-07-06T09:00:00Z',
        requiredDocuments: ['Passport', 'Medical Clearance', 'Liability Waiver', 'Lunar Training Certificate'],
        requiredTraining: ['Zero-G Adaptation', 'Highland Terrain Navigation', 'Lunar Night Survival']
      }
    },
    {
      id: 'launch-005',
      name: 'Mars Odyssey',
      destinationType: 'mars',
      description: 'Historic journey to Olympus Base on Mars.',
      date: '2025-09-24T00:00:00Z',
      availableSeats: 2,
      image: '/images/mars-odyssey.jpg',
      launchSite: 'Dubai Spaceport',
      returnDate: '2026-03-22T18:30:00Z',
      discount: 0,
      preparation: {
        briefingDate: '2025-09-20T08:00:00Z',
        requiredDocuments: ['Passport', 'Medical Clearance', 'Advanced Liability Waiver', 'Mars Training Certificate', 'Psychological Evaluation'],
        requiredTraining: ['Extended Zero-G Adaptation', 'Mars Surface Operations', 'Emergency Procedures', 'Life Support Systems', 'Radiation Protection']
      }
    }
  ];