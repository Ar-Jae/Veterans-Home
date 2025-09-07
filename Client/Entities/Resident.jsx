{
  "name": "Resident",
  "type": "object",
  "properties": {
    "first_name": {
      "type": "string",
      "description": "Veteran's first name"
    },
    "last_name": {
      "type": "string",
      "description": "Veteran's last name"
    },
    "room_number": {
      "type": "string",
      "description": "Assigned room number (e.g., 1A, 2B)"
    },
    "floor": {
      "type": "integer",
      "enum": [
        1,
        2
      ],
      "description": "Floor number"
    },
    "date_of_birth": {
      "type": "string",
      "format": "date",
      "description": "Date of birth"
    },
    "service_branch": {
      "type": "string",
      "enum": [
        "Army",
        "Navy",
        "Air Force",
        "Marines",
        "Coast Guard",
        "Space Force"
      ],
      "description": "Military service branch"
    },
    "emergency_contact_name": {
      "type": "string",
      "description": "Emergency contact name"
    },
    "emergency_contact_phone": {
      "type": "string",
      "description": "Emergency contact phone number"
    },
    "medical_notes": {
      "type": "string",
      "description": "Important medical information"
    },
    "move_in_date": {
      "type": "string",
      "format": "date",
      "description": "Date moved into facility"
    },
    "status": {
      "type": "string",
      "enum": [
        "active",
        "temporary_leave",
        "medical_leave",
        "discharged"
      ],
      "default": "active",
      "description": "Current residence status"
    }
  },
  "required": [
    "first_name",
    "last_name",
    "room_number",
    "floor"
  ]
}