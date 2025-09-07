{
  "name": "Room",
  "type": "object",
  "properties": {
    "room_number": {
      "type": "string",
      "description": "Room identifier (e.g., 1A, 1B, 2A, 2B)"
    },
    "floor": {
      "type": "integer",
      "enum": [
        1,
        2
      ],
      "description": "Floor number"
    },
    "occupancy_status": {
      "type": "string",
      "enum": [
        "occupied",
        "vacant",
        "maintenance",
        "reserved"
      ],
      "default": "vacant",
      "description": "Current room status"
    },
    "square_footage": {
      "type": "number",
      "default": 200,
      "description": "Room size in square feet"
    },
    "accessibility_features": {
      "type": "array",
      "items": {
        "type": "string"
      },
      "description": "List of accessibility features (e.g., wheelchair accessible, grab bars)"
    },
    "last_maintenance_date": {
      "type": "string",
      "format": "date",
      "description": "Date of last maintenance check"
    },
    "maintenance_notes": {
      "type": "string",
      "description": "Maintenance notes and issues"
    }
  },
  "required": [
    "room_number",
    "floor"
  ]
}