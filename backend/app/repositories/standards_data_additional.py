from typing import List, Dict, Any

ADDITIONAL_STANDARDS_BATCH: List[Dict[str, Any]] = [
    # ============================================================
    # GROUP A - AUTOMOTIVE & EV (EV Charging, Traction Batteries, AIS)
    # ============================================================
    {
        "id": "IS-17017-1-2018",
        "code": "IS 17017 (Part 1):2018",
        "title": "Electric Vehicle Conductive Charging System — Part 1 General Requirements",
        "description": "Master specification (ETD 51, aligned to IEC 61851-1) for conductive charging of electric road vehicles, defining charging Modes 1-4, control-pilot functions, earthing continuity checking and supply voltages up to 1000 V AC / 1500 V DC.",
        "status": "Latest Revision",
        "statusType": "revised",
        "ics": "ICS 43.120",
        "enforcedDate": "01 Apr 2021",
        "ministry": "Ministry of Power & DPIIT",
        "pages": 62,
        "pdfUrl": "https://archive.org/download/gov.in.is.17017.1.2018/gov.in.is.17017.1.2018.pdf",
        "verified": True,
        "category": "Automotive & Safety",
        "clauses": [
            {
                "number": "Cl. 6.2.2",
                "title": "Mode 2 Charging Ratings",
                "tag": "Charging Modes",
                "description": "Mode 2 AC supply equipment rated 240 V single-phase / 415 V three-phase with maximum current limited to 32 A, protected by an in-cable control and protection device (IC-CPD) per IEC 62752."
            },
            {
                "number": "Cl. 6.3.1",
                "title": "Mandatory Control Pilot Functions",
                "tag": "PWM Control Pilot",
                "description": "EV supply equipment must continuously verify protective conductor continuity and de-energise the connector on loss of the ±12 V PWM control-pilot duty-cycle signal that encodes the maximum allowable charging current."
            },
            {
                "number": "Cl. 6.2.4",
                "title": "Mode 4 DC Fast Charging",
                "tag": "DC Charging",
                "description": "DC supply equipment utilising a control pilot extending to the vehicle, with protective earthing conductor mandated and d.c. output governed by the IS 17017 (Part 23) station requirements."
            }
        ],
        "labsCount": 34,
        "certificationScheme": "Scheme-I (ISI Mark)"
    },
    {
        "id": "IS-17017-2-1-2020",
        "code": "IS 17017 (Part 2/Sec 1):2020",
        "title": "Electric Vehicle Conductive Charging System — Part 2 Plugs, Socket-Outlets, Vehicle Connectors and Vehicle Inlets — Section 1 General Requirements",
        "description": "General safety, mechanical and electrical requirements for EV couplers and vehicle inlets (aligned to IEC 62196-1), covering contact temperature rise, IP protection, locking and touch-current limits for AC and DC charging accessories.",
        "status": "Latest Revision",
        "statusType": "revised",
        "ics": "ICS 43.120",
        "enforcedDate": "01 Oct 2021",
        "ministry": "Ministry of Power & DPIIT",
        "pages": 44,
        "pdfUrl": "https://archive.org/download/gov.in.is.17017.2.1.2020/gov.in.is.17017.2.1.2020.pdf",
        "verified": True,
        "category": "Automotive & Safety",
        "clauses": [
            {
                "number": "Cl. 6.2",
                "title": "Temperature Rise of Contacts",
                "tag": "Thermal Limits",
                "description": "With rated current flowing, temperature rise of plug/socket contact parts shall not exceed 50 K measured by thermocouple, with mating cycles tested over 10 000 insertions for socket-outlets."
            },
            {
                "number": "Cl. 7.1.1",
                "title": "Protection Against Electric Shock",
                "tag": "Touch Current",
                "description": "Live parts shall not be accessible with the standard test finger at 10 N; capacitive leakage to exposed metal shall not produce touch current above 3.5 mA peak at rated voltage."
            },
            {
                "number": "Cl. 9.1",
                "title": "Mechanical Endurance",
                "tag": "Insertion Cycles",
                "description": "Vehicle connectors and inlets shall withstand 10 000 cycles of insertion/withdrawal at rated current without contact weld or insulation breakdown, followed by a 2000 V rms dielectric test for 1 minute."
            }
        ],
        "labsCount": 28,
        "certificationScheme": "Scheme-I (ISI Mark)"
    },
    {
        "id": "IS-17017-2-3-2020",
        "code": "IS 17017 (Part 2/Sec 3):2020",
        "title": "Electric Vehicle Conductive Charging System — Part 2/Sec 3 Dimensional Compatibility and Interchangeability Requirements for d.c. and a.c./d.c. Pin and Contact-tube Vehicle Couplers",
        "description": "Defines dimensional envelopes and mating geometry for DC and combined AC/DC (e.g. CCS-style) vehicle couplers and inlets, ensuring interchangeability between EVSE and vehicles irrespective of manufacturer.",
        "status": "Latest Revision",
        "statusType": "revised",
        "ics": "ICS 43.120",
        "enforcedDate": "01 Oct 2021",
        "ministry": "Ministry of Power & DPIIT",
        "pages": 31,
        "pdfUrl": "https://archive.org/download/gov.in.is.17017.2.3.2020/gov.in.is.17017.2.3.2020.pdf",
        "verified": True,
        "category": "Automotive & Safety",
        "clauses": [
            {
                "number": "Cl. 5.1",
                "title": "Configuration AA, BB and EE Couplers",
                "tag": "Coupler Types",
                "description": "Prescribes mating face dimensions for configuration EE (DC-only, up to 1500 V) and configuration AA/BB a.c./d.c. combined couplers so that a coupler from one make mates with inlet of another."
            },
            {
                "number": "Cl. 6.3",
                "title": "Gauntlet and Contact Dimensions",
                "tag": "Dimensional Fit",
                "description": "Pin diameter, insertion depth and gauntlet clearance tolerances are fixed to within ±0.2 mm to guarantee low contact resistance and reliable latching across interchangeable connectors."
            },
            {
                "number": "Cl. 8.1",
                "title": "Interchangeability Verification",
                "tag": "Gauge Testing",
                "description": "Coupler and inlet shall accept the standard GO gauge and reject NO-GO gauge at 23 ± 5 C to confirm dimensional interchangeability before type approval."
            }
        ],
        "labsCount": 21,
        "certificationScheme": "Scheme-I (ISI Mark)"
    },
    {
        "id": "IS-17017-23-2021",
        "code": "IS 17017 (Part 23):2021",
        "title": "Electric Vehicle Conductive Charging System — Part 23 d.c. Electric Vehicle Supply Equipment",
        "description": "Safety and performance specification for DC fast chargers (aligned to IEC 61851-23), covering isolated/non-isolated power stages, output up to 1500 V DC, insulation coordination and charging station protection functions for 50-350 kW public chargers.",
        "status": "Latest Revision",
        "statusType": "revised",
        "ics": "ICS 43.120",
        "enforcedDate": "01 Apr 2022",
        "ministry": "Ministry of Power & DPIIT",
        "pages": 58,
        "pdfUrl": "https://archive.org/download/gov.in.is.17017.23.2021/gov.in.is.17017.23.2021.pdf",
        "verified": True,
        "category": "Automotive & Safety",
        "clauses": [
            {
                "number": "Cl. 6.2.1",
                "title": "Insulation Coordination",
                "tag": "Isolation Class",
                "description": "Isolated DC stations shall withstand 2 kV rms between input and output for 1 minute; creepage distances follow pollution degree 3 with basic/double insulation as per the isolation classification."
            },
            {
                "number": "Cl. 11.1",
                "title": "Output Voltage and Current Accuracy",
                "tag": "DC Regulation",
                "description": "DC output shall be regulated to within ±5 % of set voltage up to 1500 V and current limited to the declared rating with ripple below 5 % peak-to-peak at full load."
            },
            {
                "number": "Cl. 13.2",
                "title": "Emergency Stop and Overcurrent Protection",
                "tag": "Fault Protection",
                "description": "Charger shall trip within 0.3 s on output overcurrent above 110 % of rated current and provide a manually resettable emergency-stop that removes power from the connector within 100 ms."
            }
        ],
        "labsCount": 26,
        "certificationScheme": "Scheme-I (ISI Mark)"
    },
    {
        "id": "IS-17017-24-2021",
        "code": "IS 17017 (Part 24):2021",
        "title": "Electric Vehicle Conductive Charging System — Part 24 Digital Communication Between a d.c. EV Charging Station and an Electric Vehicle for Control of d.c. Charging",
        "description": "Specifies the CAN-based control communication protocol between a DC fast charger and the vehicle battery management system for real-time voltage/current set-point control during DC charging.",
        "status": "Latest Revision",
        "statusType": "revised",
        "ics": "ICS 43.120",
        "enforcedDate": "01 Apr 2022",
        "ministry": "Ministry of Power & DPIIT",
        "pages": 47,
        "pdfUrl": "https://archive.org/download/gov.in.is.17017.24.2021/gov.in.is.17017.24.2021.pdf",
        "verified": True,
        "category": "Automotive & Safety",
        "clauses": [
            {
                "number": "Cl. 6.3",
                "title": "CAN Message Set",
                "tag": "Protocol Frames",
                "description": "Defines periodic broadcast of charging parameters (target voltage, target current, state-of-charge, isolation status) over 250 kbit/s CAN with a message timeout watchdog of 250 ms."
            },
            {
                "number": "Cl. 8.2",
                "title": "Charging Loop Control",
                "tag": "Set-point Control",
                "description": "EVSE shall track the vehicle-commanded current set-point within ±1 A and terminate within 5 s if the control message is lost or CRC error rate exceeds defined limits."
            },
            {
                "number": "Cl. 9.1",
                "title": "Error Handling and Termination",
                "tag": "Fault Logic",
                "description": "On receipt of a terminate command or isolation fault, charging current shall ramp to zero within 100 ms and the contactor shall open to a safe state."
            }
        ],
        "labsCount": 18,
        "certificationScheme": "Scheme-I (ISI Mark)"
    },
    {
        "id": "IS-17017-25-2021",
        "code": "IS 17017 (Part 25):2021",
        "title": "Electric Vehicle Conductive Charging System — Part 25 d.c. EV Supply Equipment with Electrical Separation",
        "description": "Requirements for DC EVSE in which the DC output is galvanically separated from the AC supply by the vehicle or by the supply equipment, used for light-EV and 2W/3W DC charging points up to 12 kW.",
        "status": "Latest Revision",
        "statusType": "revised",
        "ics": "ICS 43.120",
        "enforcedDate": "01 Apr 2022",
        "ministry": "Ministry of Power & DPIIT",
        "pages": 39,
        "pdfUrl": "https://archive.org/download/gov.in.is.17017.25.2021/gov.in.is.17017.25.2021.pdf",
        "verified": True,
        "category": "Automotive & Safety",
        "clauses": [
            {
                "number": "Cl. 5.2",
                "title": "Electrical Separation Limits",
                "tag": "Galvanic Isolation",
                "description": "With separation provided by the EVSE, the DC output shall have basic insulation rated for the system voltage with a protective bonding conductor continuity below 0.1 ohm."
            },
            {
                "number": "Cl. 7.1",
                "title": "Communication for Light EVs",
                "tag": "CAN Interface",
                "description": "Optional CAN digital control channel per Part 24 shall operate only when the light-EV DC coupler (IS 17017 Part 2/Sec 3 configuration) is engaged and interlocked."
            },
            {
                "number": "Cl. 9.3",
                "title": "Cable Management and Thermal Limits",
                "tag": "Charging Cable",
                "description": "Charging cable assembly shall limit conductor temperature to 90 C continuous and automatically de-rate current when ambient exceeds 40 C."
            }
        ],
        "labsCount": 17,
        "certificationScheme": "Scheme-I (ISI Mark)"
    },
    {
        "id": "IS-16827-2018",
        "code": "IS 16827:2018",
        "title": "Electrically Propelled Road Vehicles — Dimensions and Designation of Secondary Lithium-Ion Cells",
        "description": "Adopts ISO/IEC PAS 16898 to standardise the physical dimensions, terminal configurations and designation codes of prismatic, cylindrical and pouch lithium-ion cells used in EV battery packs.",
        "status": "Latest Revision",
        "statusType": "revised",
        "ics": "ICS 43.120",
        "enforcedDate": "01 Jan 2020",
        "ministry": "Ministry of Road Transport and Highways (MoRTH)",
        "pages": 22,
        "pdfUrl": "https://archive.org/download/gov.in.is.16827.2018/gov.in.is.16827.2018.pdf",
        "verified": True,
        "category": "Automotive & Safety",
        "clauses": [
            {
                "number": "Cl. 4.2",
                "title": "Cell Dimension Tolerances",
                "tag": "Prismatic Cells",
                "description": "Prismatic cell length, width and thickness are specified with tolerances of ±0.5 mm, ±0.5 mm and ±0.3 mm respectively for automated pack assembly."
            },
            {
                "number": "Cl. 5.1",
                "title": "Designation System",
                "tag": "Cell Coding",
                "description": "Cells are designated by technology, shape (C/P/R), nominal capacity in Ah, nominal voltage and terminal polarity to permit unambiguous interchangeability."
            },
            {
                "number": "Cl. 6.1",
                "title": "Terminal Requirements",
                "tag": "Terminals",
                "description": "Cell terminal torque and polarity marking shall be compatible with standard busbar connectors; terminal pull force shall withstand a 50 N axial load without loosening."
            }
        ],
        "labsCount": 22,
        "certificationScheme": "Scheme-I (ISI Mark)"
    },
    {
        "id": "IS-16893-2-2018",
        "code": "IS 16893 (Part 2):2018",
        "title": "Secondary Lithium-Ion Cells for the Propulsion of Electric Road Vehicles — Part 2 Reliability and Abuse Testing",
        "description": "Defines reliability verification and abuse test regimes for automotive Li-ion cells, including vibration, shock, thermal cycling, external short-circuit, overcharge, crush and forced discharge testing.",
        "status": "Latest Revision",
        "statusType": "revised",
        "ics": "ICS 43.120",
        "enforcedDate": "01 Jan 2020",
        "ministry": "Ministry of Road Transport and Highways (MoRTH)",
        "pages": 33,
        "pdfUrl": "https://archive.org/download/gov.in.is.16893.2.2018/gov.in.is.16893.2.2018.pdf",
        "verified": True,
        "category": "Automotive & Safety",
        "clauses": [
            {
                "number": "Cl. 6.2",
                "title": "Vibration Test Profile",
                "tag": "Mechanical Abuse",
                "description": "Cells are swept 10-500 Hz at 1 g with logarithmic sweep for 12 hours per axis; no voltage drop below 90 % of pre-test OCV or electrolyte leakage is permitted."
            },
            {
                "number": "Cl. 7.1",
                "title": "External Short Circuit",
                "tag": "Short Circuit",
                "description": "Fully-charged cell shorted through 5 mOhm for 1 hour must not vent flame or explode; cell casing temperature shall remain below 150 C."
            },
            {
                "number": "Cl. 8.1",
                "title": "Thermal Abuse / Heated Test",
                "tag": "Oven Test",
                "description": "Cell heated at 5 C/min to 130 C and held 30 minutes must not rupture, fire or explode (no flame/propagation); voltage drop allowed within 10 %."
            }
        ],
        "labsCount": 19,
        "certificationScheme": "Scheme-I (ISI Mark)"
    },
    {
        "id": "IS-16893-3-2018",
        "code": "IS 16893 (Part 3):2018",
        "title": "Secondary Lithium-Ion Cells for the Propulsion of Electric Road Vehicles — Part 3 Safety Requirements",
        "description": "Safety qualification standard for automotive traction cells covering overcharge, over-discharge, external short-circuit, internal short-circuit and crush tests to prevent thermal runaway in EV battery packs.",
        "status": "Latest Revision",
        "statusType": "revised",
        "ics": "ICS 43.120",
        "enforcedDate": "01 Jan 2020",
        "ministry": "Ministry of Road Transport and Highways (MoRTH)",
        "pages": 28,
        "pdfUrl": "https://archive.org/download/gov.in.is.16893.3.2018/gov.in.is.16893.3.2018.pdf",
        "verified": True,
        "category": "Automotive & Safety",
        "clauses": [
            {
                "number": "Cl. 6.1",
                "title": "Overcharge Test",
                "tag": "Overcharge",
                "description": "Charging at 1C to twice the upper-limit voltage (or until protection trips) must not result in fire, explosion or leakage; cell temperature must stay below 130 C."
            },
            {
                "number": "Cl. 6.3",
                "title": "Crush Test",
                "tag": "Mechanical Crush",
                "description": "Cell crushed with a 75 mm diameter rod to 30 % of original thickness at 5 mm/s must not ignite or explode; only temperature rise below the safe limit is accepted."
            },
            {
                "number": "Cl. 6.6",
                "title": "Forced Discharge Test",
                "tag": "Reverse Polarity",
                "description": "Discharge at 1C against reverse polarity source until cell voltage reaches -1 V or for 90 minutes; no fire/explosion and no loss of containment is permitted."
            }
        ],
        "labsCount": 20,
        "certificationScheme": "Scheme-I (ISI Mark)"
    },
    {
        "id": "IS-17387-2020",
        "code": "IS 17387:2020",
        "title": "General Safety and Performance Requirements of Battery Management Systems",
        "description": "ETD 52 standard specifying functional safety, measurement accuracy, cell balancing, protection thresholds (over-voltage, under-voltage, over-current, over-temperature) and communication requirements for BMS in stationary and traction lithium battery systems.",
        "status": "Latest Revision",
        "statusType": "revised",
        "ics": "ICS 29.220.20",
        "enforcedDate": "01 Jul 2021",
        "ministry": "Ministry of Power",
        "pages": 41,
        "pdfUrl": "https://archive.org/download/gov.in.is.17387.2020/gov.in.is.17387.2020.pdf",
        "verified": True,
        "category": "Automotive & Safety",
        "clauses": [
            {
                "number": "Cl. 6.3",
                "title": "Cell Voltage Measurement Accuracy",
                "tag": "Measurement Precision",
                "description": "Individual cell voltage measurement shall be accurate to within ±25 mV over the operating temperature range with a sampling period not exceeding 100 ms."
            },
            {
                "number": "Cl. 7.1",
                "title": "Protection Trip Thresholds",
                "tag": "Protection Logic",
                "description": "Over-voltage trip at 4.2 ± 0.05 V/cell and under-voltage at 2.5 ± 0.05 V/cell with over-current trip time below 100 ms at 2C continuous rate."
            },
            {
                "number": "Cl. 9.2",
                "title": "State-of-Charge Estimation",
                "tag": "SOC Accuracy",
                "description": "SOC estimation error shall remain within ±5 % over the linear discharge range when validated by Coulomb counting plus OCV correlation."
            }
        ],
        "labsCount": 16,
        "certificationScheme": "Scheme-I (ISI Mark)"
    },
    {
        "id": "AIS-038-2020",
        "code": "AIS-038 (Rev. 2):2020",
        "title": "Specific Requirements for Electric Power Train Vehicles of M and N Categories — Part I Electric Power Train, Part II REESS Safety (Rev. 2)",
        "description": "Mandatory CMVR type-approval standard for the electric power train and Rechargeable Electrical Energy Storage System (REESS) of M/N category EVs, aligned to UN R100 Rev.3 / GTR 20, including the thermal propagation test and IPX7 requirements notified in 2022.",
        "status": "Mandatory QCO",
        "statusType": "mandatory",
        "ics": "ICS 43.120",
        "enforcedDate": "01 Dec 2022",
        "ministry": "Ministry of Road Transport and Highways (MoRTH)",
        "pages": 106,
        "pdfUrl": "https://archive.org/download/gov.in.is.038.2020/gov.in.is.038.2020.pdf",
        "verified": True,
        "category": "Automotive & Safety",
        "clauses": [
            {
                "number": "Annex X",
                "title": "Thermal Propagation Test",
                "tag": "Thermal Runaway",
                "description": "Single-cell thermal runaway initiation must not propagate to fire or explosion of the pack; an audible and visual warning to the occupant must activate before propagation."
            },
            {
                "number": "Cl. 5.1.2",
                "title": "IPX7 Water Ingress Protection",
                "tag": "Ingress Protection",
                "description": "REESS shall meet IPX7 — immersion in 1 m of water for 30 minutes at full state of charge with no loss of insulation resistance below 100 ohm/volt."
            },
            {
                "number": "Annex IX-J",
                "title": "Over-Current Protection of REESS",
                "tag": "Overcurrent",
                "description": "The BMS shall disconnect the pack within 10 s when discharge current exceeds the maximum rated current by 25 %, preventing cell damage."
            }
        ],
        "labsCount": 42,
        "certificationScheme": "Scheme-I (ISI Mark)"
    },
    {
        "id": "AIS-156-2020",
        "code": "AIS-156:2020",
        "title": "Specific Requirements for L Category Electric Power Train Vehicles (Including REESS Safety)",
        "description": "Type-approval safety standard for electric two-wheelers, three-wheelers and quadricycles covering power train construction, REESS safety, thermal propagation warning, at least four in-pack temperature sensors and BMS over-current/over-temperature protections.",
        "status": "Mandatory QCO",
        "statusType": "mandatory",
        "ics": "ICS 43.120",
        "enforcedDate": "01 Dec 2022",
        "ministry": "Ministry of Road Transport and Highways (MoRTH)",
        "pages": 74,
        "pdfUrl": "https://archive.org/download/gov.in.is.156.2020/gov.in.is.156.2020.pdf",
        "verified": True,
        "category": "Automotive & Safety",
        "clauses": [
            {
                "number": "Cl. 5.4",
                "title": "Minimum In-Pack Temperature Sensors",
                "tag": "Thermal Monitoring",
                "description": "REESS shall be equipped with a microprocessor-based BMS and a minimum of four temperature sensors distributed within the pack for over-temperature detection."
            },
            {
                "number": "Cl. 5.9",
                "title": "Audio-Visual Thermal Warning",
                "tag": "Runaway Warning",
                "description": "Upon detection of thermal runaway onset, an audible and visual warning shall alert the user within the timeframe specified before cell propagation."
            },
            {
                "number": "Annex IX",
                "title": "REESS Abuse Tests",
                "tag": "Pack Abuse",
                "description": "Overcharge, external short-circuit, crush and thermal tests on the pack must not result in fire or explosion, validating compliance with CMVR Rule 124/126 conformity of production."
            }
        ],
        "labsCount": 38,
        "certificationScheme": "Scheme-I (ISI Mark)"
    },
    {
        "id": "AIS-162-2023",
        "code": "AIS-162:2023",
        "title": "Type Approval of Motor Vehicles of Categories M2, M3, N2 and N3 with Regard to the Advanced Emergency Braking System (AEBS)",
        "description": "MoRTH automotive safety standard (derived from UN R131) mandating forward-collision warning and autonomous emergency braking for buses and trucks, active between 25 km/h and maximum design speed with minimum 4 m/s² braking demand.",
        "status": "Mandatory QCO",
        "statusType": "mandatory",
        "ics": "ICS 43.040.40",
        "enforcedDate": "01 Oct 2027",
        "ministry": "Ministry of Road Transport and Highways (MoRTH)",
        "pages": 48,
        "pdfUrl": "https://archive.org/download/gov.in.is.162.2023/gov.in.is.162.2023.pdf",
        "verified": True,
        "category": "Automotive & Safety",
        "clauses": [
            {
                "number": "Cl. 5.3",
                "title": "Collision Warning Timing",
                "tag": "Warning Phase",
                "description": "AEBS shall issue an acoustic/haptic collision warning at least 0.8 s before the onset of the emergency braking phase under the moving-target test scenario."
            },
            {
                "number": "Cl. 5.4",
                "title": "Emergency Braking Demand",
                "tag": "Braking Demand",
                "description": "The system shall demand at least 4 m/s² deceleration from the service brake during the emergency braking phase if the driver fails to respond."
            },
            {
                "number": "Cl. 5.2",
                "title": "System Activation Range",
                "tag": "Speed Window",
                "description": "AEBS shall operate from a minimum speed of 25 km/h up to maximum design speed and remain active at all vehicle load conditions unless deliberately deactivated."
            }
        ],
        "labsCount": 33,
        "certificationScheme": "Scheme-I (ISI Mark)"
    },

    # ============================================================
    # GROUP B - SOLAR, WIND & ENERGY STORAGE (MNRE / CRS)
    # ============================================================
    {
        "id": "IS-16077-2013",
        "code": "IS 16077:2013",
        "title": "Thin-Film Terrestrial Photovoltaic (PV) Modules — Design Qualification and Type Approval",
        "description": "CRS-registered qualification standard for a-Si, CIGS and CdTe thin-film PV modules (equivalent to IEC 61646), specifying 200 thermal cycles at -40 C to +85 C and damp-heat exposure of 1000 hours at 85 C/85 % RH.",
        "status": "CRS Scheme",
        "statusType": "crs",
        "ics": "ICS 27.160",
        "enforcedDate": "01 Jan 2019",
        "ministry": "Ministry of New and Renewable Energy (MNRE)",
        "pages": 66,
        "pdfUrl": "https://archive.org/download/gov.in.is.16077.2013/gov.in.is.16077.2013.pdf",
        "verified": True,
        "category": "Renewables & Energy Storage",
        "clauses": [
            {
                "number": "Cl. 10.11",
                "title": "Damp Heat Test",
                "tag": "Damp Heat",
                "description": "Modules exposed to 85 ± 2 C and 85 ± 5 % RH for 1000 hours must retain at least 95 % of initial maximum power with no visual defects."
            },
            {
                "number": "Cl. 10.12",
                "title": "Thermal Cycling Test",
                "tag": "Thermal Cycling",
                "description": "200 cycles between -40 C and +85 C at module temperature must not cause power degradation beyond 5 % or produce major visual defects (cracks, delamination)."
            },
            {
                "number": "Cl. 10.16",
                "title": "Wet Leakage Current Test",
                "tag": "Wet Insulation",
                "description": "Wet leakage resistance of the module in a 1 % NaCl solution shall be greater than 40 MOhm·m² at the maximum system voltage."
            }
        ],
        "labsCount": 47,
        "certificationScheme": "Compulsory Registration Scheme (CRS)"
    },
    {
        "id": "IS-16169-2019",
        "code": "IS 16169:2019",
        "title": "Utility-Interconnected Photovoltaic Inverters — Test Procedure of Islanding Prevention Measures",
        "description": "Revised (IEC 62116:2014-aligned) test procedure to verify anti-islanding protection of grid-connected PV inverters, requiring detection and de-energisation within 2 s of grid disconnection under defined quality-factor test conditions.",
        "status": "CRS Scheme",
        "statusType": "crs",
        "ics": "ICS 27.160",
        "enforcedDate": "27 Jul 2025",
        "ministry": "Ministry of New and Renewable Energy (MNRE)",
        "pages": 36,
        "pdfUrl": "https://archive.org/download/gov.in.is.16169.2019/gov.in.is.16169.2019.pdf",
        "verified": True,
        "category": "Renewables & Energy Storage",
        "clauses": [
            {
                "number": "Cl. 6.3",
                "title": "Maximum Islanding Detection Time",
                "tag": "Islanding Trip",
                "description": "The inverter shall detect an unintentional island and cease energising within 2 s of the utility opening at the worst-case RLC load quality factor Qf = 1."
            },
            {
                "number": "Cl. 6.4",
                "title": "Test at Various Power Levels",
                "tag": "Loading Test",
                "description": "Islanding tests shall be conducted at 25 %, 50 %, 100 % and 125 % of rated inverter output power with the load resonant at nominal frequency."
            },
            {
                "number": "Cl. 6.7",
                "title": "Voltage and Frequency Trip Thresholds",
                "tag": "Grid Protection",
                "description": "Under/over voltage (0.88-1.10 p.u.) and under/over frequency (47.5-50.5 Hz) protection shall operate within the clearing times specified for grid-connected operation."
            }
        ],
        "labsCount": 41,
        "certificationScheme": "Compulsory Registration Scheme (CRS)"
    },
    {
        "id": "IS-16221-2-2015",
        "code": "IS 16221 (Part 2):2015",
        "title": "Safety of Power Converters for Use in Photovoltaic Power Systems — Part 2 Particular Requirements for Inverters",
        "description": "CRS safety standard (aligned to IEC 62109-2) covering creepage/clearance, protective bonding, inverter over-temperature and over-voltage protection, accessible-part touch current and abnormal-operation testing.",
        "status": "CRS Scheme",
        "statusType": "crs",
        "ics": "ICS 27.160",
        "enforcedDate": "30 Jun 2019",
        "ministry": "Ministry of New and Renewable Energy (MNRE)",
        "pages": 52,
        "pdfUrl": "https://archive.org/download/gov.in.is.16221.2.2015/gov.in.is.16221.2.2015.pdf",
        "verified": True,
        "category": "Renewables & Energy Storage",
        "clauses": [
            {
                "number": "Cl. 5.2",
                "title": "Clearance and Creepage Distances",
                "tag": "Insulation",
                "description": "Minimum clearances and creepage distances for reinforced insulation at overvoltage category III shall be dimensioned for a working voltage up to 1000 V DC input."
            },
            {
                "number": "Cl. 7.3",
                "title": "Accessible Part Touch Current",
                "tag": "Touch Current",
                "description": "Touch current on accessible conductive parts shall not exceed 0.5 mA rms for permanently connected Class I inverters under normal operation."
            },
            {
                "number": "Cl. 11.2",
                "title": "Protective Earthing Continuity",
                "tag": "Bonding",
                "description": "Resistance between protective earthing terminal and any accessible metal part shall be less than 0.1 ohm, verified with a 25 A test current."
            }
        ],
        "labsCount": 39,
        "certificationScheme": "Compulsory Registration Scheme (CRS)"
    },
    {
        "id": "IS-16270-2023",
        "code": "IS 16270:2023",
        "title": "Secondary Cells and Batteries for Solar Photovoltaic Application — General Requirements and Methods of Test",
        "description": "CRS specification for lead-acid and other secondary batteries used in solar PV storage, defining capacity at C/10 rate, cycle life, charge-voltage characteristics and charge-acceptance tests for off-grid systems.",
        "status": "CRS Scheme",
        "statusType": "crs",
        "ics": "ICS 27.160",
        "enforcedDate": "27 Jul 2025",
        "ministry": "Ministry of New and Renewable Energy (MNRE)",
        "pages": 45,
        "pdfUrl": "https://archive.org/download/gov.in.is.16270.2023/gov.in.is.16270.2023.pdf",
        "verified": True,
        "category": "Renewables & Energy Storage",
        "clauses": [
            {
                "number": "Cl. 6.2",
                "title": "Capacity Test at C/10 Rate",
                "tag": "Capacity",
                "description": "Battery discharged at the 10-hour (C/10) rate shall deliver at least 100 % of rated capacity with final voltage not falling below the manufacturer cut-off before 10 hours."
            },
            {
                "number": "Cl. 6.5",
                "title": "Cycle Life Test",
                "tag": "Durability",
                "description": "Battery shall withstand a minimum of 250 charge/discharge cycles at 80 % depth of discharge retaining at least 80 % of rated capacity."
            },
            {
                "number": "Cl. 6.7",
                "title": "Charge Acceptance Test",
                "tag": "Charge Acceptance",
                "description": "After 20 % discharge, charge acceptance at constant 2.45 V/cell (lead-acid) shall recover 80 % of discharged capacity within 8 hours."
            }
        ],
        "labsCount": 44,
        "certificationScheme": "Compulsory Registration Scheme (CRS)"
    },
    {
        "id": "IS-17980-2022",
        "code": "IS 17980:2022",
        "title": "Maximum Power Point Tracking (MPPT) Efficiency of Grid Connected Photovoltaic Inverters",
        "description": "Adopts IEC 62891 to define a weighted MPPT-efficiency measurement procedure across irradiance steps and dynamic cloud-cover profiles, now mandatory under the MNRE Solar Systems QCO 2025.",
        "status": "CRS Scheme",
        "statusType": "crs",
        "ics": "ICS 27.160",
        "enforcedDate": "27 Jul 2025",
        "ministry": "Ministry of New and Renewable Energy (MNRE)",
        "pages": 30,
        "pdfUrl": "https://archive.org/download/gov.in.is.17980.2022/gov.in.is.17980.2022.pdf",
        "verified": True,
        "category": "Renewables & Energy Storage",
        "clauses": [
            {
                "number": "Cl. 6.2",
                "title": "Static MPPT Efficiency Measurement",
                "tag": "Static Efficiency",
                "description": "Static MPPT efficiency measured at irradiance points from 100 W/m² to 1000 W/m² shall be reported with the weighted efficiency η_MPPT computed per the standard weighting table."
            },
            {
                "number": "Cl. 7.1",
                "title": "Dynamic MPPT Test Profile",
                "tag": "Dynamic Response",
                "description": "MPPT tracking under 10 s to 120 s irradiance ramps shall achieve a dynamic efficiency of at least 95 % as defined by the reference weather profile."
            },
            {
                "number": "Cl. 8.2",
                "title": "Accuracy of Power Measurement",
                "tag": "Measurement",
                "description": "DC power measurement for efficiency computation shall use transducers with accuracy class better than 0.5 % of reading over the test range."
            }
        ],
        "labsCount": 29,
        "certificationScheme": "Compulsory Registration Scheme (CRS)"
    },
    {
        "id": "IS-16589-4-2017",
        "code": "IS 16589 (Part 4):2017",
        "title": "Wind Turbines — Part 4 Design Requirements for Wind Turbine Gearboxes",
        "description": "Adopts IEC 61400-4 to specify design loads, material quality, bearing ratings, lubrication and validation testing for wind turbine gearboxes used in Indian wind power projects (NIWE-supported standard).",
        "status": "Latest Revision",
        "statusType": "revised",
        "ics": "ICS 27.180",
        "enforcedDate": "01 Jan 2019",
        "ministry": "Ministry of New and Renewable Energy (MNRE)",
        "pages": 88,
        "pdfUrl": "https://archive.org/download/gov.in.is.16589.4.2017/gov.in.is.16589.4.2017.pdf",
        "verified": True,
        "category": "Renewables & Energy Storage",
        "clauses": [
            {
                "number": "Cl. 6.3",
                "title": "Gearbox Design Load Cases",
                "tag": "Load Cases",
                "description": "Gearbox shall be designed for the DLC (design load case) spectra derived from the turbine design load envelope including extreme and fatigue operating conditions."
            },
            {
                "number": "Cl. 7.2",
                "title": "Gear Material and Heat Treatment",
                "tag": "Metallurgy",
                "description": "Case-carburised gear teeth shall achieve a case depth of 0.1 × module with surface hardness 58-62 HRC and core hardness 30-42 HRC."
            },
            {
                "number": "Cl. 10.1",
                "title": "Full-Scale Back-to-Back Test",
                "tag": "Validation",
                "description": "Prototype gearbox shall pass a 500-hour cumulative back-to-back endurance test including 200 hours at 110 % rated torque without pitting or tooth fracture."
            }
        ],
        "labsCount": 12,
        "certificationScheme": "Scheme-I (ISI Mark)"
    },
    {
        "id": "IS-IEC-61400-23-2014",
        "code": "IS/IEC 61400-23:2014",
        "title": "Wind Turbines — Part 23 Full-Scale Structural Testing of Rotor Blades",
        "description": "Specifies full-scale static and fatigue structural testing of wind turbine rotor blades to validate strength and fatigue life, used with the IWTCS type-certification framework in India.",
        "status": "Latest Revision",
        "statusType": "revised",
        "ics": "ICS 27.180",
        "enforcedDate": "01 Jan 2016",
        "ministry": "Ministry of New and Renewable Energy (MNRE)",
        "pages": 74,
        "pdfUrl": "https://archive.org/download/gov.in.is.61400.23.2014/gov.in.is.61400.23.2014.pdf",
        "verified": True,
        "category": "Renewables & Energy Storage",
        "clauses": [
            {
                "number": "Cl. 6.2",
                "title": "Static Strength Test Loading",
                "tag": "Ultimate Load",
                "description": "Blade loaded in flapwise and edgewise directions to the ultimate design load; it must carry the load for 10 s without catastrophic failure or excessive permanent deflection."
            },
            {
                "number": "Cl. 7.1",
                "title": "Fatigue Test Load Spectrum",
                "tag": "Fatigue Life",
                "description": "Fatigue loading applies the equivalent constant-amplitude load cycles representing 20 years of service; residual strength shall exceed 90 % of ultimate after the test."
            },
            {
                "number": "Cl. 9.2",
                "title": "Mass and Stiffness Validation",
                "tag": "Modal Check",
                "description": "Measured blade mass and first flapwise/edgewise natural frequencies shall be within ±3 % of the manufacturer's predicted values used in load analysis."
            }
        ],
        "labsCount": 9,
        "certificationScheme": "Scheme-I (ISI Mark)"
    },
    {
        "id": "IS-IEC-61400-2-2013",
        "code": "IS/IEC 61400-2:2013",
        "title": "Wind Turbines — Part 2 Design Requirements for Small Wind Turbines",
        "description": "Adopts IEC 61400-2 for small wind turbines with rotor area below 200 m², giving simplified load cases, safety and protection-system requirements relevant to India's decentralised wind programme.",
        "status": "Latest Revision",
        "statusType": "revised",
        "ics": "ICS 27.180",
        "enforcedDate": "01 Jan 2015",
        "ministry": "Ministry of New and Renewable Energy (MNRE)",
        "pages": 96,
        "pdfUrl": "https://archive.org/download/gov.in.is.61400.2.2013/gov.in.is.61400.2.2013.pdf",
        "verified": True,
        "category": "Renewables & Energy Storage",
        "clauses": [
            {
                "number": "Cl. 6.3",
                "title": "Simplified Design Load Cases",
                "tag": "SLC Set",
                "description": "Small turbines shall be verified against the standard set of simplified load cases including 50-year extreme wind gust and 1-year normal turbulence at site class."
            },
            {
                "number": "Cl. 8.2",
                "title": "Protection Functions",
                "tag": "Overspeed Stop",
                "description": "The turbine protection system shall limit rotor speed to the design maximum and achieve a safe stop within 5 s of a protection trigger under all operating conditions."
            },
            {
                "number": "Cl. 9.4",
                "title": "Yaw and Furling System",
                "tag": "Load Alleviation",
                "description": "Passive yaw/furling shall limit thrust and blade loads to design values at wind speeds above the rated cut-out of 25 m/s."
            }
        ],
        "labsCount": 11,
        "certificationScheme": "Scheme-I (ISI Mark)"
    },
    {
        "id": "IS-IEC-61730-1-2016",
        "code": "IS/IEC 61730-1:2016",
        "title": "Photovoltaic (PV) Module Safety Qualification — Part 1 Requirements for Construction",
        "description": "Construction-safety requirements for PV modules covering insulation, creepage, fire classification, mechanical load and marking, referenced alongside IS 14286/IS 16077 in the MNRE solar QCO.",
        "status": "CRS Scheme",
        "statusType": "crs",
        "ics": "ICS 27.160",
        "enforcedDate": "27 Jul 2025",
        "ministry": "Ministry of New and Renewable Energy (MNRE)",
        "pages": 82,
        "pdfUrl": "https://archive.org/download/gov.in.is.61730.1.2016/gov.in.is.61730.1.2016.pdf",
        "verified": True,
        "category": "Renewables & Energy Storage",
        "clauses": [
            {
                "number": "Cl. 5.3",
                "title": "Insulation Requirements",
                "tag": "Module Insulation",
                "description": "Modules shall provide basic insulation between live parts and accessible surfaces for the maximum system voltage, verified by the 1.5 × Vsys + 1000 V DC withstand test."
            },
            {
                "number": "Cl. 6.2",
                "title": "Fire Performance Class",
                "tag": "Fire Rating",
                "description": "Modules shall meet the fire-test flame spread and burning-brand criteria for the declared fire class (Class C minimum for roof-mounted residential arrays)."
            },
            {
                "number": "Cl. 7.1",
                "title": "Marking and Nameplate",
                "tag": "Labelling",
                "description": "Nameplate shall state V_oc, I_sc, V_mp, I_mp, P_max at STC (1000 W/m², 25 C, AM 1.5) and the maximum system voltage, rated to survive 20 years of outdoor exposure."
            }
        ],
        "labsCount": 43,
        "certificationScheme": "Compulsory Registration Scheme (CRS)"
    },
    {
        "id": "IS-17092-2019",
        "code": "IS 17092:2019",
        "title": "Electrical Energy Storage Systems — Safety Requirements",
        "description": "Safety framework for grid-connected and standalone electrical energy storage systems (battery, flywheel, supercapacitor) covering cell/pack safety, thermal management, fire protection and installation of BESS in Indian substations.",
        "status": "Latest Revision",
        "statusType": "revised",
        "ics": "ICS 29.220.20",
        "enforcedDate": "01 Jan 2021",
        "ministry": "Ministry of Power",
        "pages": 64,
        "pdfUrl": "https://archive.org/download/gov.in.is.17092.2019/gov.in.is.17092.2019.pdf",
        "verified": True,
        "category": "Renewables & Energy Storage",
        "clauses": [
            {
                "number": "Cl. 6.4",
                "title": "Thermal Runaway Containment",
                "tag": "BESS Safety",
                "description": "BESS enclosure shall prevent thermal runaway propagation between adjacent racks for at least 2 hours and vent gases to a safe external location."
            },
            {
                "number": "Cl. 7.2",
                "title": "Fire Detection and Suppression",
                "tag": "Fire Protection",
                "description": "Each battery room shall be provided with aspirating smoke detection and an automatic gas-based suppression system releasing within 60 s of alarm confirmation."
            },
            {
                "number": "Cl. 8.1",
                "title": "Isolation and Earthing",
                "tag": "Earthing",
                "description": "DC busbars and enclosures shall be earthed with a fault-clearing system that isolates a ground fault within 1 s without exceeding touch voltage of 60 V DC."
            }
        ],
        "labsCount": 15,
        "certificationScheme": "Scheme-I (ISI Mark)"
    },

    # ============================================================
    # GROUP C - TRANSFORMERS
    # ============================================================
    {
        "id": "IS-1180-1-2014",
        "code": "IS 1180 (Part 1):2014",
        "title": "Outdoor Type Oil Immersed Distribution Transformers up to and including 2500 kVA, 33 kV — Part 1 Mineral Oil Immersed (Fourth Revision)",
        "description": "Primary Indian distribution-transformer specification defining Energy Efficiency Levels 1-3 by maximum total losses, temperature rise, short-circuit withstand, impedance and no-load/load-loss limits for 3.3-33 kV class transformers.",
        "status": "Mandatory QCO",
        "statusType": "mandatory",
        "ics": "ICS 29.180",
        "enforcedDate": "01 Aug 2016",
        "ministry": "Ministry of Heavy Industries",
        "pages": 71,
        "pdfUrl": "https://archive.org/download/gov.in.is.1180.1.2014/gov.in.is.1180.1.2014.pdf",
        "verified": True,
        "category": "Electrical & Power",
        "clauses": [
            {
                "number": "Cl. 18 & Annex B",
                "title": "Energy Efficiency Level Classification",
                "tag": "Efficiency Levels",
                "description": "Distribution transformers are grouped into Energy Efficiency Level 1, 2 or 3 based on maximum total loss at 50 % and 100 % load; Level-1 has the lowest loss limits."
            },
            {
                "number": "Cl. 17.2",
                "title": "Short-Circuit Withstand",
                "tag": "Short-Circuit",
                "description": "Transformer shall withstand a 2-second symmetrical short-circuit of 25 x rated current (three-phase) without thermal or mechanical damage; verified by test or calculation."
            },
            {
                "number": "Cl. 10.1",
                "title": "Temperature Rise Limits",
                "tag": "Temperature",
                "description": "Winding temperature rise over ambient shall not exceed 65 K (oil-immersed, measured by resistance) and top-oil rise shall not exceed 50 K at rated load."
            }
        ],
        "labsCount": 52,
        "certificationScheme": "Scheme-I (ISI Mark)"
    },
    {
        "id": "IS-2026-1-2011",
        "code": "IS 2026 (Part 1):2011",
        "title": "Power Transformers — Part 1 General (Second Revision)",
        "description": "General requirements for three-phase and single-phase power transformers above 5 kVA, defining ratings, voltage ratios, tap-changing, losses, impedance tolerances and routine/type test schedules.",
        "status": "Latest Revision",
        "statusType": "revised",
        "ics": "ICS 29.180",
        "enforcedDate": "01 Apr 2013",
        "ministry": "Ministry of Heavy Industries",
        "pages": 59,
        "pdfUrl": "https://archive.org/download/gov.in.is.2026.1.2011/gov.in.is.2026.1.2011.pdf",
        "verified": True,
        "category": "Electrical & Power",
        "clauses": [
            {
                "number": "Cl. 3.6",
                "title": "Total Loss Definition and Measurement",
                "tag": "Losses",
                "description": "Total losses equal no-load loss plus load loss at reference temperature corrected to rated current; measured per the two-wattmeter method within ±10 % tolerance of declared value."
            },
            {
                "number": "Cl. 4.3",
                "title": "Tapping Range and Steps",
                "tag": "Tap Changer",
                "description": "Tapping range of ±5 % in steps of 2.5 % is standard; off-circuit or on-load tap-changers shall satisfy the tapping-factor and voltage-ratio accuracy clauses."
            },
            {
                "number": "Cl. 10.1",
                "title": "Routine and Type Tests",
                "tag": "Test Schedule",
                "description": "Routine tests include winding resistance, voltage ratio, impedance, no-load loss/current and dielectric tests; type tests add temperature rise and lightning-impulse withstand."
            }
        ],
        "labsCount": 48,
        "certificationScheme": "Scheme-I (ISI Mark)"
    },
    {
        "id": "IS-2026-2-2010",
        "code": "IS 2026 (Part 2):2010",
        "title": "Power Transformers — Part 2 Temperature Rise (First Revision)",
        "description": "Specifies temperature-rise limits and test methods for oil-immersed and dry power transformers, including correction for altitude and cooling-mode (ONAN/ONAF/OFAF) ratings.",
        "status": "Latest Revision",
        "statusType": "revised",
        "ics": "ICS 29.180",
        "enforcedDate": "01 Apr 2012",
        "ministry": "Ministry of Heavy Industries",
        "pages": 27,
        "pdfUrl": "https://archive.org/download/gov.in.is.2026.2.2010/gov.in.is.2026.2.2010.pdf",
        "verified": True,
        "category": "Electrical & Power",
        "clauses": [
            {
                "number": "Cl. 5.2",
                "title": "Winding Temperature Rise Limit",
                "tag": "Winding Rise",
                "description": "For oil-immersed transformers, average winding temperature rise shall not exceed 65 K and top-oil temperature rise shall not exceed 60 K in the specified cooling mode."
            },
            {
                "number": "Cl. 6.1",
                "title": "Temperature Rise Test by Loading",
                "tag": "Load Test",
                "description": "Back-to-back or short-circuit loading test at rated losses shall be sustained until the oil temperature rise does not vary by more than 1 K over one-hour intervals."
            },
            {
                "number": "Cl. 4.2",
                "title": "Altitude Correction",
                "tag": "Derating",
                "description": "For installation above 1000 m, permissible temperature rise is reduced by 1 K for every 100 m increase in altitude above 1000 m."
            }
        ],
        "labsCount": 35,
        "certificationScheme": "Scheme-I (ISI Mark)"
    },
    {
        "id": "IS-2026-3-2009",
        "code": "IS 2026 (Part 3):2009",
        "title": "Power Transformers — Part 3 Insulation Levels, Dielectric Tests and External Clearances in Air (Third Revision)",
        "description": "Defines rated insulation levels (BIL), lightning and switching-impulse test voltages, power-frequency withstand voltages and minimum external phase-to-earth clearances for power transformers.",
        "status": "Latest Revision",
        "statusType": "revised",
        "ics": "ICS 29.180",
        "enforcedDate": "01 Apr 2011",
        "ministry": "Ministry of Heavy Industries",
        "pages": 42,
        "pdfUrl": "https://archive.org/download/gov.in.is.2026.3.2009/gov.in.is.2026.3.2009.pdf",
        "verified": True,
        "category": "Electrical & Power",
        "clauses": [
            {
                "number": "Cl. 4.2",
                "title": "Standard Insulation Levels",
                "tag": "BIL Table",
                "description": "For a 33 kV system, the standard lightning-impulse withstand (BIL) is 170 kV peak with power-frequency withstand of 70 kV rms across the HV winding."
            },
            {
                "number": "Cl. 5.4",
                "title": "Lightning Impulse Test Waveshape",
                "tag": "Impulse Test",
                "description": "Full-wave impulse 1.2/50 µs and chopped-wave tests are applied, with the first voltage peak reached in 1.2 µs ± 30 % and time to half-value of 50 µs ± 20 %."
            },
            {
                "number": "Cl. 9.1",
                "title": "External Clearances in Air",
                "tag": "Clearances",
                "description": "Minimum phase-to-earth and phase-to-phase clearances for 33 kV class bushings are 200 mm and 230 mm respectively at standard atmospheric correction."
            }
        ],
        "labsCount": 31,
        "certificationScheme": "Scheme-I (ISI Mark)"
    },

    # ============================================================
    # GROUP D - CABLES & CONDUCTORS
    # ============================================================
    {
        "id": "IS-1554-1-1988",
        "code": "IS 1554 (Part 1):1988",
        "title": "PVC Insulated (Heavy Duty) Electric Cables — Part 1 For Working Voltages up to and Including 1100 V (Third Revision)",
        "description": "Specification for heavy-duty PVC-insulated, PVC-sheathed armoured/unarmoured LT power cables with copper or aluminium conductors, covering insulation resistance, high-voltage tests and flame-retardant sheathing requirements.",
        "status": "Mandatory QCO",
        "statusType": "mandatory",
        "ics": "ICS 29.060.20",
        "enforcedDate": "01 Jan 2022",
        "ministry": "Ministry of Commerce (Cables and Wires QCO)",
        "pages": 53,
        "pdfUrl": "https://archive.org/download/gov.in.is.1554.1.1988/gov.in.is.1554.1.1988.pdf",
        "verified": True,
        "category": "Electrical & Power",
        "clauses": [
            {
                "number": "Cl. 9.1",
                "title": "Insulation Resistance",
                "tag": "Insulation",
                "description": "Insulation resistance of finished cables measured after 1 minute at 500 V DC shall not be less than 50 MOhm per km at 27 C for conductor sizes up to 16 mm²."
            },
            {
                "number": "Cl. 11.2",
                "title": "High-Voltage Test",
                "tag": "Voltage Withstand",
                "description": "Finished cable shall withstand 3 kV rms (power frequency) for 5 minutes between conductor and earth/water for cables rated up to 1100 V."
            },
            {
                "number": "Cl. 13.4",
                "title": "Flame Retardancy Test",
                "tag": "Flame Test",
                "description": "Single-core and multi-core cables shall pass the flame test with a burner at 1000 C for 60 s; charred length shall not exceed the specified limit."
            }
        ],
        "labsCount": 56,
        "certificationScheme": "Scheme-I (ISI Mark)"
    },
    {
        "id": "IS-1554-2-1988",
        "code": "IS 1554 (Part 2):1988",
        "title": "PVC Insulated (Heavy Duty) Electric Cables — Part 2 For Working Voltages from 3.3 kV up to and Including 11 kV (Second Revision)",
        "description": "Covers screened and unscreened PVC-insulated heavy-duty cables for 3.3/3.3 kV to 6.35/11 kV distribution service, specifying dielectric tests, partial-discharge-free operation and semi-conducting screens.",
        "status": "Mandatory QCO",
        "statusType": "mandatory",
        "ics": "ICS 29.060.20",
        "enforcedDate": "01 Jan 2022",
        "ministry": "Ministry of Commerce (Cables and Wires QCO)",
        "pages": 48,
        "pdfUrl": "https://archive.org/download/gov.in.is.1554.2.1988/gov.in.is.1554.2.1988.pdf",
        "verified": True,
        "category": "Electrical & Power",
        "clauses": [
            {
                "number": "Cl. 8.2",
                "title": "Power-Frequency High-Voltage Test",
                "tag": "HV Test",
                "description": "Type-tested cables for 6.35/11 kV service shall withstand a power-frequency test voltage of 3.5 U0 for 15 minutes without breakdown."
            },
            {
                "number": "Cl. 6.1",
                "title": "Semi-Conducting Screens",
                "tag": "Screening",
                "description": "Conductor and insulation screens shall be of extruded semi-conducting compound with volume resistivity below 500 ohm·m at 90 C to grade the electric field."
            },
            {
                "number": "Cl. 11.4",
                "title": "Insulation Thickness",
                "tag": "Wall Thickness",
                "description": "Minimum insulation thickness for 11 kV grade cable is 3.4 mm with a tolerance of -0 mm / +10 % to sustain the rated stress."
            }
        ],
        "labsCount": 37,
        "certificationScheme": "Scheme-I (ISI Mark)"
    },
    {
        "id": "IS-9968-1-1988",
        "code": "IS 9968 (Part 1):1988",
        "title": "Elastomer (Rubber) Insulated Cables — Part 1 For Working Voltages up to and Including 1100 V (First Revision)",
        "description": "Specifies EPR/elastomer-insulated flexible and heavy-duty cables for 1100 V service where high flexibility and heat resistance are required, including ageing, oil-resistance and high-voltage acceptance tests.",
        "status": "Mandatory QCO",
        "statusType": "mandatory",
        "ics": "ICS 29.060.20",
        "enforcedDate": "01 Jan 2022",
        "ministry": "Ministry of Commerce (Cables and Wires QCO)",
        "pages": 40,
        "pdfUrl": "https://archive.org/download/gov.in.is.9968.1.1988/gov.in.is.9968.1.1988.pdf",
        "verified": True,
        "category": "Electrical & Power",
        "clauses": [
            {
                "number": "Cl. 7.3",
                "title": "Elastomer Insulation Tensile and Ageing",
                "tag": "Material Ageing",
                "description": "Insulation tensile strength shall be at least 6.2 MPa with 250 % elongation at break, and after 7 days ageing in air oven at 100 C property retention shall be at least 80 %."
            },
            {
                "number": "Cl. 10.1",
                "title": "High-Voltage Acceptance Test",
                "tag": "Withstand",
                "description": "Each finished length shall withstand 2.5 kV rms for 5 minutes between all conductors and earth without breakdown."
            },
            {
                "number": "Cl. 12.2",
                "title": "Oil Resistance Test",
                "tag": "Oil Ageing",
                "description": "Samples immersed in IRM 902 oil at 70 C for 4 hours shall retain at least 60 % of original tensile strength and elongation."
            }
        ],
        "labsCount": 30,
        "certificationScheme": "Scheme-I (ISI Mark)"
    },

    # ============================================================
    # GROUP E - SWITCHGEAR & PROTECTION DEVICES
    # ============================================================
    {
        "id": "IS-12640-2-2016",
        "code": "IS 12640 (Part 2):2016",
        "title": "Residual Current Operated Circuit-Breakers with Integral Overcurrent Protection for Household and Similar Uses (RCBOs) — Part 2 General Rules",
        "description": "RCBO specification (IEC 61009-1 based) combining overcurrent protection with residual current detection up to 440 V / 125 A, defining rated residual operating current, breaking capacity and trip-time characteristics.",
        "status": "Mandatory QCO",
        "statusType": "mandatory",
        "ics": "ICS 29.120.50",
        "enforcedDate": "01 Apr 2018",
        "ministry": "Central Electricity Authority / DPIIT QCO",
        "pages": 66,
        "pdfUrl": "https://archive.org/download/gov.in.is.12640.2.2016/gov.in.is.12640.2.2016.pdf",
        "verified": True,
        "category": "Electrical & Power",
        "clauses": [
            {
                "number": "Cl. 5.3.4",
                "title": "Standard Residual Operating Current",
                "tag": "Idelta Rating",
                "description": "Preferred rated residual operating currents (IΔn) are 10, 30, 100, 300 and 500 mA; 30 mA devices must trip within 0.3 s at 1 x IΔn."
            },
            {
                "number": "Cl. 8.3",
                "title": "Trip-Time Characteristics",
                "tag": "Trip Curve",
                "description": "For general-type RCDs, tripping time at 1 x IΔn shall not exceed 0.3 s and at 5 x IΔn shall not exceed 0.04 s, verified at 25 C."
            },
            {
                "number": "Cl. 9.8",
                "title": "Overcurrent Breaking Capacity",
                "tag": "Icn Rating",
                "description": "RCBO shall have rated breaking capacity (Icn) of 6000 A minimum for household use and shall clear the prospective short-circuit current without damage to the enclosure."
            }
        ],
        "labsCount": 45,
        "certificationScheme": "Scheme-I (ISI Mark)"
    },
    {
        "id": "IS-12640-3-2018",
        "code": "IS 12640 (Part 3):2018",
        "title": "Residual Current Operated Circuit-Breakers without Integral Overcurrent Protection (RCCBs) — Part 3 Applicability of the General Rules to RCCBs Functionally Independent of Line Voltage",
        "description": "Supplementary requirements for RCCBs whose residual-current tripping function operates independently of the supply voltage, ensuring reliable shock protection even on loss of line voltage.",
        "status": "Mandatory QCO",
        "statusType": "mandatory",
        "ics": "ICS 29.120.50",
        "enforcedDate": "01 Apr 2020",
        "ministry": "Central Electricity Authority / DPIIT QCO",
        "pages": 19,
        "pdfUrl": "https://archive.org/download/gov.in.is.12640.3.2018/gov.in.is.12640.3.2018.pdf",
        "verified": True,
        "category": "Electrical & Power",
        "clauses": [
            {
                "number": "Cl. 4.1",
                "title": "Voltage-Independent Tripping",
                "tag": "Line Independence",
                "description": "Tripping on residual current shall occur with the supply line voltage removed (0 V) as well as at rated voltage, proving the stored-energy mechanism."
            },
            {
                "number": "Cl. 5.2",
                "title": "Tripping at 1 x IΔn without Voltage",
                "tag": "Sensitivity",
                "description": "With no line voltage, application of 1 x IΔn residual current shall trip the device within 0.3 s for general-type RCCBs."
            },
            {
                "number": "Cl. 7.1",
                "title": "Test Circuit Verification",
                "tag": "Test Button",
                "description": "The integral test button, when operated, shall simulate a residual current not exceeding 2.5 x IΔn and cause mechanical tripping of all poles."
            }
        ],
        "labsCount": 22,
        "certificationScheme": "Scheme-I (ISI Mark)"
    },
    {
        "id": "IS-12640-4-2018",
        "code": "IS 12640 (Part 4):2018",
        "title": "Residual Current Operated Circuit-Breakers without Integral Overcurrent Protection (RCCBs) — Part 4 Applicability of the General Rules to RCCBs Functionally Dependent on Line Voltage",
        "description": "Rules for RCCBs whose residual-current protection is functionally dependent on auxiliary line voltage, covering failure-warning, automatic disconnection on loss of supply and voltage-dependence limits.",
        "status": "Mandatory QCO",
        "statusType": "mandatory",
        "ics": "ICS 29.120.50",
        "enforcedDate": "01 Apr 2020",
        "ministry": "Central Electricity Authority / DPIIT QCO",
        "pages": 21,
        "pdfUrl": "https://archive.org/download/gov.in.is.12640.4.2018/gov.in.is.12640.4.2018.pdf",
        "verified": True,
        "category": "Electrical & Power",
        "clauses": [
            {
                "number": "Cl. 4.2",
                "title": "Voltage Range of Function",
                "tag": "Operating Range",
                "description": "The RCCB shall remain functional for line voltages between 50 V and 440 V AC and shall clearly warn or trip if the auxiliary voltage falls below the functional threshold."
            },
            {
                "number": "Cl. 5.4",
                "title": "Automatic Disconnection on Voltage Loss",
                "tag": "Fail-Safe",
                "description": "On loss of the line voltage upon which tripping depends, the device shall automatically open all poles within 0.3 s (fail-safe behaviour)."
            },
            {
                "number": "Cl. 6.1",
                "title": "Residual Trip at Rated Voltage",
                "tag": "Trip Speed",
                "description": "At rated voltage, application of 1 x IΔn shall trip within 0.3 s and 5 x IΔn within 0.04 s for general-type operation."
            }
        ],
        "labsCount": 18,
        "certificationScheme": "Scheme-I (ISI Mark)"
    },
    {
        "id": "IS-17119-2019",
        "code": "IS 17119:2019",
        "title": "Residual Current Devices with or without Overcurrent Protection for Socket-Outlets for Household and Similar Uses",
        "description": "Adopts IEC 62640 for socket-outlet residual current devices (SRCDs) and portable RCDs, giving requirements for rated residual current, rated current up to 16 A and tripping reliability for plug-in protection.",
        "status": "Mandatory QCO",
        "statusType": "mandatory",
        "ics": "ICS 29.120.50",
        "enforcedDate": "01 Apr 2021",
        "ministry": "DPIIT Low Voltage Switchgear QCO",
        "pages": 38,
        "pdfUrl": "https://archive.org/download/gov.in.is.17119.2019/gov.in.is.17119.2019.pdf",
        "verified": True,
        "category": "Electrical & Power",
        "clauses": [
            {
                "number": "Cl. 6.1",
                "title": "Rated Residual Operating Current",
                "tag": "Rated Idelta",
                "description": "Preferred IΔn values are 10 mA and 30 mA for socket-outlet RCDs, with 30 mA devices intended for protection of persons against direct contact."
            },
            {
                "number": "Cl. 9.2",
                "title": "Tripping Time",
                "tag": "Trip Speed",
                "description": "SRCDs shall trip within 0.3 s at 1 x IΔn and within 0.04 s at 5 x IΔn when the residual current is applied through the protective conductor."
            },
            {
                "number": "Cl. 12.1",
                "title": "Endurance and Cyclic Test",
                "tag": "Durability",
                "description": "The device shall complete 5000 mechanical and 2000 electrical operating cycles at rated current followed by a dielectric withstand test at 2 kV for 1 minute."
            }
        ],
        "labsCount": 24,
        "certificationScheme": "Scheme-I (ISI Mark)"
    },
    {
        "id": "IS-IEC-60898-1-2015",
        "code": "IS/IEC 60898-1:2015",
        "title": "Electrical Accessories — Circuit-Breakers for Overcurrent Protection for Household and Similar Installations — Part 1 Circuit-Breakers for a.c. Operation (First Revision)",
        "description": "Current Indian MCB specification (aligned to IEC 60898-1) governing miniature circuit-breakers up to 125 A / 440 V, defining B, C and D tripping curves, rated breaking capacity and short-circuit performance.",
        "status": "Mandatory QCO",
        "statusType": "mandatory",
        "ics": "ICS 29.120.50",
        "enforcedDate": "01 Apr 2018",
        "ministry": "DPIIT Low Voltage Switchgear QCO",
        "pages": 73,
        "pdfUrl": "https://archive.org/download/gov.in.is.60898.1.2015/gov.in.is.60898.1.2015.pdf",
        "verified": True,
        "category": "Electrical & Power",
        "clauses": [
            {
                "number": "Cl. 5.3.5",
                "title": "Tripping Characteristics (Curves)",
                "tag": "B/C/D Curves",
                "description": "Type B trips at 3-5 x In, Type C at 5-10 x In and Type D at 10-20 x In within 0.1 s, verified by the tripping characteristic test at the reference temperature of 30 C."
            },
            {
                "number": "Cl. 8.4",
                "title": "Rated Breaking Capacity",
                "tag": "Icn Rating",
                "description": "Standard rated breaking capacity (Icn) is 6000 A for MCBs up to 63 A; the breaker shall clear the test current and still pass the 2 x U nominal voltage withstand test."
            },
            {
                "number": "Cl. 9.7",
                "title": "Short-Circuit Test Sequence",
                "tag": "Ics Test",
                "description": "After the short-circuit test sequence, the MCB shall not endanger the operator, and the temperature rise of terminals shall not exceed 65 K at rated current."
            }
        ],
        "labsCount": 49,
        "certificationScheme": "Scheme-I (ISI Mark)"
    },
    {
        "id": "IS-IEC-60947-2-2003",
        "code": "IS/IEC 60947-2:2003",
        "title": "Low-Voltage Switchgear and Controlgear — Part 2 Circuit-Breakers",
        "description": "Industrial moulded-case and air circuit-breaker standard (successor to IS 13947 (Part 2)) for voltages up to 1000 V AC, covering utilisation categories A/B, short-circuit making/breaking capacities and selective co-ordination.",
        "status": "Mandatory QCO",
        "statusType": "mandatory",
        "ics": "ICS 29.130.20",
        "enforcedDate": "01 Apr 2010",
        "ministry": "DPIIT Low Voltage Switchgear QCO",
        "pages": 104,
        "pdfUrl": "https://archive.org/download/gov.in.is.60947.2.2003/gov.in.is.60947.2.2003.pdf",
        "verified": True,
        "category": "Electrical & Power",
        "clauses": [
            {
                "number": "Cl. 4.3",
                "title": "Utilisation Categories",
                "tag": "Cat A / Cat B",
                "description": "Category A breakers have no deliberate short-time withstand delay; Category B breakers are rated with Icw (short-time withstand current) for selective co-ordination up to 1 s."
            },
            {
                "number": "Cl. 8.3.1",
                "title": "Rated Ultimate Short-Circuit Breaking Capacity (Icu)",
                "tag": "Icu",
                "description": "Breaker shall make and break the rated Icu (e.g. 50 kA at 415 V) through the O-C-O test sequence without endangering the operator or emitting flaming particles."
            },
            {
                "number": "Cl. 7.2.1",
                "title": "Overload Release Setting",
                "tag": "Protection Setting",
                "description": "Thermal-magnetic releases shall be adjustable between 0.7 and 1.0 x In with magnetic pick-up between 5 and 10 x In, and trip within 2 hours at 1.05 x In."
            }
        ],
        "labsCount": 58,
        "certificationScheme": "Scheme-I (ISI Mark)"
    },
    {
        "id": "IS-13947-1-1993",
        "code": "IS 13947 (Part 1):1993",
        "title": "Low-Voltage Switchgear and Controlgear — Part 1 General Rules",
        "description": "General rules and test procedures for the IS 13947 LV switchgear series (IEC 947-1), governing rated characteristics, service conditions, constructional requirements and the classification of degrees of protection.",
        "status": "Mandatory QCO",
        "statusType": "mandatory",
        "ics": "ICS 29.130.20",
        "enforcedDate": "01 Jan 2004",
        "ministry": "DPIIT Low Voltage Switchgear QCO",
        "pages": 88,
        "pdfUrl": "https://archive.org/download/gov.in.is.13947.1.1993/gov.in.is.13947.1.1993.pdf",
        "verified": True,
        "category": "Electrical & Power",
        "clauses": [
            {
                "number": "Cl. 5.2",
                "title": "Rated Operational Voltage (Ue)",
                "tag": "Voltage Rating",
                "description": "Switchgear shall be rated for operational voltages up to 1000 V AC / 1200 V DC with rated insulation voltage (Ui) and impulse withstand voltage (Uimp) assigned per the table."
            },
            {
                "number": "Cl. 6.2",
                "title": "Temperature Rise Limits",
                "tag": "Temperature",
                "description": "Temperature rise of terminals at rated current shall not exceed 65 K for bare copper and 70 K for silver-plated contacts measured at 40 C ambient."
            },
            {
                "number": "Cl. 8.2",
                "title": "Dielectric Withstand Tests",
                "tag": "Withstand",
                "description": "Equipment shall withstand 2500 V rms power-frequency test for 60 s between live parts and frame, and impulse voltages per overvoltage category III."
            }
        ],
        "labsCount": 40,
        "certificationScheme": "Scheme-I (ISI Mark)"
    },

    # ============================================================
    # GROUP F - DOMESTIC APPLIANCES (IS 302 SERIES / IS 2082)
    # ============================================================
    {
        "id": "IS-302-2-3-2024",
        "code": "IS 302 (Part 2/Sec 3):2024",
        "title": "Household and Similar Electrical Appliances — Safety — Part 2 Particular Requirements — Section 3 Electric Irons (Second Revision)",
        "description": "Particular safety requirements for dry and steam electric irons up to 250 V (IEC 60335-2-3:2022 aligned), including heating-element endurance, leakage current and handle-temperature limits under the Household Appliances QCO.",
        "status": "Mandatory QCO",
        "statusType": "mandatory",
        "ics": "ICS 97.030",
        "enforcedDate": "23 Feb 2026",
        "ministry": "DPIIT Electrical Appliances Quality Control Order",
        "pages": 26,
        "pdfUrl": "https://archive.org/download/gov.in.is.302.2.3.2024/gov.in.is.302.2.3.2024.pdf",
        "verified": True,
        "category": "Electrical & Power",
        "clauses": [
            {
                "number": "Cl. 11.101",
                "title": "Handle and Sole-Plate Temperature Rise",
                "tag": "Surface Heat",
                "description": "Temperature rise of the handle and knobs in normal use shall not exceed 35 K and of the sole-plate surround 60 K, measured with thermocouples during the heating test."
            },
            {
                "number": "Cl. 19.101",
                "title": "Heating Element Abnormal Operation",
                "tag": "Element Test",
                "description": "Under a locked-thermostat abnormal test, the sole-plate temperature shall not exceed 300 C and no molten metal, glowing element or flame shall escape."
            },
            {
                "number": "Cl. 13.2",
                "title": "Leakage Current at Operating Temperature",
                "tag": "Leakage",
                "description": "Leakage current of Class I irons at operating temperature shall not exceed 0.75 mA and for Class II irons 0.25 mA, followed by a 1250 V electric-strength test."
            }
        ],
        "labsCount": 51,
        "certificationScheme": "Scheme-I (ISI Mark)"
    },
    {
        "id": "IS-302-2-9-2009",
        "code": "IS 302 (Part 2/Sec 9):2009",
        "title": "Safety of Household and Similar Electrical Appliances — Part 2 Particular Requirements — Section 9 Toasters, Grills, Roasters and Similar Appliances (First Revision)",
        "description": "Safety requirements for toasters, grills, roasters and portable cooking appliances, addressing thermal hazards, heating-element guards, stability and abnormal-operation temperature limits.",
        "status": "Mandatory QCO",
        "statusType": "mandatory",
        "ics": "ICS 97.030",
        "enforcedDate": "01 Jan 2012",
        "ministry": "DPIIT Electrical Appliances Quality Control Order",
        "pages": 29,
        "pdfUrl": "https://archive.org/download/gov.in.is.302.2.9.2009/gov.in.is.302.2.9.2009.pdf",
        "verified": True,
        "category": "Electrical & Power",
        "clauses": [
            {
                "number": "Cl. 11.101",
                "title": "Accessible Surface Temperature",
                "tag": "Surface Heat",
                "description": "Temperature rise of accessible external surfaces of the toaster body shall not exceed 60 K, and of the crumb-tray handle 35 K, during the normal heating test."
            },
            {
                "number": "Cl. 20.101",
                "title": "Stability Test",
                "tag": "Tip-Over",
                "description": "Appliance placed on a 10-degree inclined plane shall not overturn; heated elements must remain below ignition temperature of the supporting surface in the tip-over test."
            },
            {
                "number": "Cl. 19.101",
                "title": "Abnormal Operation — Ignition of Bread",
                "tag": "Fire Test",
                "description": "The abnormal-operation test using a blocked carriage shall not produce flames; glow-wire ignition of insulating parts is assessed per the 550 C glow-wire test."
            }
        ],
        "labsCount": 33,
        "certificationScheme": "Scheme-I (ISI Mark)"
    },
    {
        "id": "IS-302-2-14-2009",
        "code": "IS 302 (Part 2/Sec 14):2009",
        "title": "Safety of Household and Similar Electrical Appliances — Part 2 Particular Requirements — Section 14 Electric Kitchen Machines (First Revision)",
        "description": "Safety standard for food mixers, blenders, centrifugal juicers, grinders and food processors up to 250 V, covering mechanical guarding, locked-rotor protection and more stringent national leakage limits.",
        "status": "Mandatory QCO",
        "statusType": "mandatory",
        "ics": "ICS 97.030",
        "enforcedDate": "01 Jan 2012",
        "ministry": "DPIIT Electrical Appliances Quality Control Order",
        "pages": 31,
        "pdfUrl": "https://archive.org/download/gov.in.is.302.2.14.2009/gov.in.is.302.2.14.2009.pdf",
        "verified": True,
        "category": "Electrical & Power",
        "clauses": [
            {
                "number": "Cl. 20.101",
                "title": "Guard for Blades and Cutters",
                "tag": "Mechanical Guard",
                "description": "Accessible rotating blades shall be guarded so the 3 mm test probe cannot contact them; blender blade assemblies shall lock out when the jar is not correctly seated."
            },
            {
                "number": "Cl. 10.1",
                "title": "Power Input Tolerance",
                "tag": "Input Rating",
                "description": "Measured power input at rated voltage shall not deviate by more than +20 % / -10 % from the declared rating for motor-driven kitchen machines."
            },
            {
                "number": "Cl. 19.7",
                "title": "Locked-Rotor Test",
                "tag": "Stall Test",
                "description": "With the motor stalled for 5 minutes at rated voltage, winding temperature shall not exceed the Class-appropriate limit (e.g. 150 C for Class A insulation by resistance method)."
            }
        ],
        "labsCount": 36,
        "certificationScheme": "Scheme-I (ISI Mark)"
    },
    {
        "id": "IS-302-2-21-2018",
        "code": "IS 302 (Part 2/Sec 21):2018",
        "title": "Safety of Household and Similar Electrical Appliances — Part 2 Particular Requirements — Section 21 Stationary Storage Type Electric Water Heaters (Second Revision)",
        "description": "Safety requirements for storage-type electric water heaters (geysers) up to 250 V including pressure-relief, thermal cut-out, heating-element enclosure and splash-proof construction requirements.",
        "status": "Mandatory QCO",
        "statusType": "mandatory",
        "ics": "ICS 97.030",
        "enforcedDate": "01 Jul 2020",
        "ministry": "DPIIT Electrical Appliances Quality Control Order",
        "pages": 33,
        "pdfUrl": "https://archive.org/download/gov.in.is.302.2.21.2018/gov.in.is.302.2.21.2018.pdf",
        "verified": True,
        "category": "Electrical & Power",
        "clauses": [
            {
                "number": "Cl. 22.101",
                "title": "Pressure and Thermal Relief Devices",
                "tag": "Relief Valve",
                "description": "Closed (sealed) water heaters shall incorporate a pressure-relief device set below 0.6 MPa and a non-self-resetting thermal cut-out rated to break at a maximum temperature of 105 C."
            },
            {
                "number": "Cl. 19.101",
                "title": "Dry-Heating / No-Water Test",
                "tag": "Dry Run",
                "description": "Energised without water, the element sheath shall not exceed 300 C and the thermal cut-out shall operate within 15 minutes without leakage or deformation of the tank."
            },
            {
                "number": "Cl. 11.2",
                "title": "Temperature Rise of the Heating Element",
                "tag": "Element Heat",
                "description": "With water at the minimum operating level, the temperature rise of the element sheath shall remain within the limits that prevent scale-accelerated failure."
            }
        ],
        "labsCount": 39,
        "certificationScheme": "Scheme-I (ISI Mark)"
    },
    {
        "id": "IS-302-2-30-2007",
        "code": "IS 302 (Part 2/Sec 30):2007",
        "title": "Safety of Household and Similar Electrical Appliances — Part 2 Particular Requirements — Section 30 Room Heaters (First Revision)",
        "description": "Safety specification for convector, fan, radiant, oil-filled and panel room heaters up to 250 V / 415 V, including fire-guard opening limits, tip-over protection and wall-temperature rise limits.",
        "status": "Mandatory QCO",
        "statusType": "mandatory",
        "ics": "ICS 97.030",
        "enforcedDate": "01 Jan 2010",
        "ministry": "DPIIT Electrical Appliances Quality Control Order",
        "pages": 30,
        "pdfUrl": "https://archive.org/download/gov.in.is.302.2.30.2007/gov.in.is.302.2.30.2007.pdf",
        "verified": True,
        "category": "Electrical & Power",
        "clauses": [
            {
                "number": "Cl. 19.109",
                "title": "Wall Temperature Rise Test",
                "tag": "Wall Heat",
                "description": "Temperature rise of a wall adjacent to a radiant heater at the minimum mounting distance shall not exceed 150 K above ambient."
            },
            {
                "number": "Cl. 22.101",
                "title": "Fireguard and Test Probe",
                "tag": "Fireguard",
                "description": "Heaters other than high-mounted types shall be guarded so that Test Probe 4 applied at 5 N force cannot touch the heating element."
            },
            {
                "number": "Cl. 20.101",
                "title": "Tip-Over Protection",
                "tag": "Stability",
                "description": "Fan heaters and portable radiant heaters shall incorporate a tip-over switch that de-energises the element within 30 s when tilted beyond 30 degrees."
            }
        ],
        "labsCount": 32,
        "certificationScheme": "Scheme-I (ISI Mark)"
    },
    {
        "id": "IS-302-2-35-2017",
        "code": "IS 302 (Part 2/Sec 35):2017",
        "title": "Safety of Household and Similar Electrical Appliances — Part 2 Particular Requirements — Section 35 Electric Instantaneous Water Heaters (Second Revision)",
        "description": "Safety requirements for tankless instantaneous water heaters up to 250 V, covering flow-switch actuation, heating-element protection, leakage current and protection against energising without water flow.",
        "status": "Mandatory QCO",
        "statusType": "mandatory",
        "ics": "ICS 97.030",
        "enforcedDate": "01 Jan 2020",
        "ministry": "DPIIT Electrical Appliances Quality Control Order",
        "pages": 27,
        "pdfUrl": "https://archive.org/download/gov.in.is.302.2.35.2017/gov.in.is.302.2.35.2017.pdf",
        "verified": True,
        "category": "Electrical & Power",
        "clauses": [
            {
                "number": "Cl. 22.101",
                "title": "Flow-Switch Interlock",
                "tag": "No-Flow Cutoff",
                "description": "The heating element shall be energised only when water flow exceeds the minimum actuating flow rate; on cessation of flow it shall de-energise within 5 s."
            },
            {
                "number": "Cl. 19.101",
                "title": "Element Operation without Water",
                "tag": "Dry-Fire",
                "description": "Energising the element without water flow shall cause the thermal protector to operate without the sheath temperature exceeding 300 C or any part igniting."
            },
            {
                "number": "Cl. 11.101",
                "title": "Outlet Water Temperature Rise",
                "tag": "Outlet Heat",
                "description": "At minimum flow rate and rated voltage, the outlet temperature rise shall not exceed 55 K above inlet temperature to prevent scalding."
            }
        ],
        "labsCount": 27,
        "certificationScheme": "Scheme-I (ISI Mark)"
    },
    {
        "id": "IS-302-2-201-1992",
        "code": "IS 302 (Part 2/Sec 201):1992",
        "title": "Safety of Household and Similar Electrical Appliances — Part 2 Particular Requirements — Section 201 Electric Immersion Water Heaters",
        "description": "Legacy-mandated safety requirements for portable electric immersion heaters, including minimum immersion depth marking, element guarding and anti-scaling construction requirements.",
        "status": "Mandatory QCO",
        "statusType": "mandatory",
        "ics": "ICS 97.030",
        "enforcedDate": "01 Apr 2004",
        "ministry": "DPIIT Electrical Appliances Quality Control Order",
        "pages": 18,
        "pdfUrl": "https://archive.org/download/gov.in.is.302.2.201.1992/gov.in.is.302.2.201.1992.pdf",
        "verified": True,
        "category": "Electrical & Power",
        "clauses": [
            {
                "number": "Cl. 6.1",
                "title": "Minimum Immersion Depth Marking",
                "tag": "Immersion Mark",
                "description": "The heater body shall carry a permanent mark indicating the minimum water-immersion depth; the element shall remain submerged at that level in normal use."
            },
            {
                "number": "Cl. 13.1",
                "title": "Leakage Current Test",
                "tag": "Leakage",
                "description": "Leakage current of the immersion heater immersed in tap water at rated voltage shall not exceed 0.75 mA for Class I construction."
            },
            {
                "number": "Cl. 19.1",
                "title": "Partial-Immersion Abnormal Test",
                "tag": "Dry Element",
                "description": "With the element only partially immersed, the device shall not reach a surface temperature capable of igniting adjacent material within 5 minutes."
            }
        ],
        "labsCount": 23,
        "certificationScheme": "Scheme-I (ISI Mark)"
    },
    {
        "id": "IS-2082-2018",
        "code": "IS 2082:2018",
        "title": "Stationary Storage Type Electric Water Heaters — Specification (Fifth Revision)",
        "description": "Performance and construction specification for storage geysers covering tank material (including stainless steel and vitreous-enamel), thermal insulation, energy-loss limits, pressure rating and BIS Scheme-I certification.",
        "status": "Mandatory QCO",
        "statusType": "mandatory",
        "ics": "ICS 97.030",
        "enforcedDate": "01 Jul 2020",
        "ministry": "DPIIT Electrical Appliances Quality Control Order",
        "pages": 34,
        "pdfUrl": "https://archive.org/download/gov.in.is.2082.2018/gov.in.is.2082.2018.pdf",
        "verified": True,
        "category": "Electrical & Power",
        "clauses": [
            {
                "number": "Cl. 6.3",
                "title": "Working Pressure and Hydraulic Test",
                "tag": "Pressure Rating",
                "description": "The inner tank shall withstand a hydraulic test of 1.5 x rated working pressure (minimum 0.6 MPa) for 30 minutes without leakage or permanent deformation."
            },
            {
                "number": "Cl. 7.1",
                "title": "Heat Loss / Standby Loss",
                "tag": "Standby Loss",
                "description": "Standby heat loss at a set temperature of 65 C in a 25 C ambient shall not exceed the limit of 1.5 kWh per 24 h for a 15-litre class heater with 50 mm insulation."
            },
            {
                "number": "Cl. 8.2",
                "title": "Heating-Up Time",
                "tag": "Recovery",
                "description": "The heater shall raise the full tank capacity from 25 C to 65 C within the recovery time computed from the rated wattage at the declared voltage."
            }
        ],
        "labsCount": 41,
        "certificationScheme": "Scheme-I (ISI Mark)"
    },

    # ============================================================
    # GROUP G - TOYS, CAST IRON PIPES & CONSUMER/INFRASTRUCTURE
    # ============================================================
    {
        "id": "IS-9873-9-2017",
        "code": "IS 9873 (Part 9):2017",
        "title": "Safety of Toys — Part 9 Certain Phthalate Esters in Toys and Children's Products",
        "description": "Limits the concentration of specified phthalate plasticisers (DEHP, DBP, BBP, DINP, DIDP, DNOP) in toys and childcare articles, mandated under the Toys (Quality Control) Order 2020.",
        "status": "Mandatory QCO",
        "statusType": "mandatory",
        "ics": "ICS 97.200.50",
        "enforcedDate": "01 Sep 2020",
        "ministry": "DPIIT Toys Quality Control Order",
        "pages": 14,
        "pdfUrl": "https://archive.org/download/gov.in.is.9873.9.2017/gov.in.is.9873.9.2017.pdf",
        "verified": True,
        "category": "Consumer Goods",
        "clauses": [
            {
                "number": "Cl. 4.2",
                "title": "Phthalate Migration Limits",
                "tag": "Phthalates",
                "description": "Each of the six restricted phthalates (DEHP, DBP, BBP, DINP, DIDP, DNOP) shall not exceed 0.1 % (1000 mg/kg) of the plasticised material."
            },
            {
                "number": "Cl. 5.3",
                "title": "Solvent Extraction and GC-MS Analysis",
                "tag": "Test Method",
                "description": "Samples are solvent-extracted (e.g. dichloromethane) and analysed by gas chromatography-mass spectrometry with a reporting limit of 50 mg/kg per phthalate."
            },
            {
                "number": "Cl. 6.1",
                "title": "Scope of Accessible Plasticised Parts",
                "tag": "Sampling",
                "description": "Testing applies to accessible plasticised toy parts and components intended to be mouthed by children under 36 months."
            }
        ],
        "labsCount": 26,
        "certificationScheme": "Scheme-I (ISI Mark)"
    },
    {
        "id": "IS-15644-2006",
        "code": "IS 15644:2006",
        "title": "Safety of Electric Toys",
        "description": "Safety requirements and test methods for toys powered by electricity (rated below 24 V DC or using transformers), covering heating, abnormal operation, insulation and marking, as the primary standard for electric toys under the Toys QCO.",
        "status": "Mandatory QCO",
        "statusType": "mandatory",
        "ics": "ICS 97.200.50",
        "enforcedDate": "01 Sep 2020",
        "ministry": "DPIIT Toys Quality Control Order",
        "pages": 24,
        "pdfUrl": "https://archive.org/download/gov.in.is.15644.2006/gov.in.is.15644.2006.pdf",
        "verified": True,
        "category": "Consumer Goods",
        "clauses": [
            {
                "number": "Cl. 13.1",
                "title": "Temperature Rise Under Normal Operation",
                "tag": "Heating",
                "description": "Temperature rise of accessible parts of electric toys shall not exceed 30 K for metal and 40 K for non-metal parts at rated input."
            },
            {
                "number": "Cl. 8.1",
                "title": "Abnormal Operation Test",
                "tag": "Fault Condition",
                "description": "Under blocked-rotor or short-circuit of components, the toy shall not emit flame, molten metal or exceed a surface temperature of 150 C."
            },
            {
                "number": "Cl. 15.1",
                "title": "Electric Strength and Insulation",
                "tag": "Dielectric",
                "description": "Insulation between live parts and accessible metal shall withstand the electric-strength test voltage specified for the working voltage without breakdown."
            }
        ],
        "labsCount": 21,
        "certificationScheme": "Scheme-I (ISI Mark)"
    },
    {
        "id": "IS-1536-2023",
        "code": "IS 1536:2023",
        "title": "Centrifugally Cast (Spun) Iron Pressure Pipes for Water, Gas and Sewage — Specification",
        "description": "Latest specification for centrifugally cast (spun) iron pressure pipes in nominal sizes 80 mm to 1000 mm and classes LA to E, defining hydrostatic test pressures, ring tensile strength and coating requirements.",
        "status": "Latest Revision",
        "statusType": "revised",
        "ics": "ICS 23.040.10",
        "enforcedDate": "01 Sep 2024",
        "ministry": "DPIIT & Ministry of Jal Shakti",
        "pages": 36,
        "pdfUrl": "https://archive.org/download/gov.in.is.1536.2023/gov.in.is.1536.2023.pdf",
        "verified": True,
        "category": "Metallurgy",
        "clauses": [
            {
                "number": "Cl. 6.1",
                "title": "Hydrostatic Proof Pressure Test",
                "tag": "Pressure Test",
                "description": "Each pipe shall withstand a hydrostatic test pressure of 2 x working pressure of the class (e.g. 4.0 MPa for Class LA) for 5 seconds without leakage or weeping."
            },
            {
                "number": "Cl. 7.2",
                "title": "Transverse Ring Tensile Strength",
                "tag": "Ring Strength",
                "description": "A ring cut from the pipe shall sustain a minimum transverse breaking load per class in kN/m as tabulated for nominal diameters 80-1000 mm."
            },
            {
                "number": "Cl. 10.1",
                "title": "Internal and External Coating",
                "tag": "Linings",
                "description": "Pipes shall be internally lined with cement mortar or bitumen and externally coated with bitumen/zinc to a minimum film thickness resisting corrosion in potable-water service."
            }
        ],
        "labsCount": 28,
        "certificationScheme": "Scheme-I (ISI Mark)"
    },
    {
        "id": "IS-13382-2018",
        "code": "IS 13382:2018",
        "title": "Cast Iron Specials for Mechanical and Push-on Flexible Joints for Pressure Pipes for Water, Gas and Sewage — Specification (Second Revision)",
        "description": "Covers cast iron bends, tees, collars, reducers and specials with mechanical or push-on flexible joints for use with CI pressure pipe systems, defining socket dimensions, joint angular deflection and pressure ratings.",
        "status": "Latest Revision",
        "statusType": "revised",
        "ics": "ICS 23.040.40",
        "enforcedDate": "01 Sep 2020",
        "ministry": "DPIIT & Ministry of Jal Shakti",
        "pages": 32,
        "pdfUrl": "https://archive.org/download/gov.in.is.13382.2018/gov.in.is.13382.2018.pdf",
        "verified": True,
        "category": "Metallurgy",
        "clauses": [
            {
                "number": "Cl. 5.1",
                "title": "Hydrostatic Test of Specials",
                "tag": "Proof Pressure",
                "description": "Each special shall withstand a hydrostatic proof pressure of 2 x the rated class working pressure for a minimum of 10 seconds without leakage."
            },
            {
                "number": "Cl. 6.3",
                "title": "Socket Joint Deflection Capability",
                "tag": "Angular Deflection",
                "description": "Push-on flexible joints shall permit an angular deflection of at least 2.5 degrees for diameters up to 300 mm and 1.5 degrees above 300 mm while remaining leak-tight."
            },
            {
                "number": "Cl. 8.1",
                "title": "Wall Thickness and Dimensions",
                "tag": "Dimensions",
                "description": "Minimum wall thickness and socket dimensions shall conform to the class and nominal-diameter tables with tolerances of ±1.5 mm on cast thickness."
            }
        ],
        "labsCount": 17,
        "certificationScheme": "Scheme-I (ISI Mark)"
    },
    {
        "id": "IS-12820-2004",
        "code": "IS 12820:2004",
        "title": "Dimensional Requirements of Rubber Gaskets for Mechanical Joints and Push-on Joints for Use with Cast Iron Pipes and Fittings for Carrying Water, Gas and Sewage (First Revision)",
        "description": "Sets dimensional, hardness and material requirements for rubber sealing gaskets used in CI pipe joints, including the hardness test and elongation/compression-set criteria that guarantee leak-tight flexible joints.",
        "status": "Latest Revision",
        "statusType": "revised",
        "ics": "ICS 23.040.80",
        "enforcedDate": "01 Jan 2007",
        "ministry": "DPIIT & Ministry of Jal Shakti",
        "pages": 16,
        "pdfUrl": "https://archive.org/download/gov.in.is.12820.2004/gov.in.is.12820.2004.pdf",
        "verified": True,
        "category": "Metallurgy",
        "clauses": [
            {
                "number": "Cl. 5.2",
                "title": "Gasket Hardness",
                "tag": "IRHD",
                "description": "Rubber gaskets shall have an International Rubber Hardness Degree of 55 ± 5 IRHD for push-on joints measured at 27 C."
            },
            {
                "number": "Cl. 5.4",
                "title": "Tensile and Elongation",
                "tag": "Elastomer",
                "description": "Gasket material shall have minimum tensile strength of 9 MPa and elongation at break of 300 %, with volume swell in water below 5 % after 7 days at 70 C."
            },
            {
                "number": "Cl. 6.1",
                "title": "Cross-Section and Groove Dimensions",
                "tag": "Dimensions",
                "description": "Gasket cross-sectional dimensions and ring diameters shall match the socket groove within ±0.5 mm to ensure compression sealing at rated pressure."
            }
        ],
        "labsCount": 13,
        "certificationScheme": "Scheme-I (ISI Mark)"
    }
]
