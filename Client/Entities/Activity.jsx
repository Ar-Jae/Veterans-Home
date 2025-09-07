{
  "name": "Activity",
  "type": "object",
  "properties": {
    "title": {
      "type": "string",
      "description": "Activity name"
    },
    "description": {
      "type": "string",
      "description": "Activity description"
    },
    "location": {
      "type": "string",
      "enum": [
        "Multipurpose Room",
        "Library",
        "Gym",
        "Lounge",
        "TV Room",
        "Dining Hall",
        "Outdoor",
        "Other"
      ],
      "description": "Activity location"
    },
    "date": {
      "type": "string",
      "format": "date",
      "description": "Activity date"
    },
    "start_time": {
      "type": "string",
      "description": "Start time (e.g., 10:00 AM)"
    },
    "end_time": {
      "type": "string",
      "description": "End time (e.g., 11:30 AM)"
    },
    "category": {
      "type": "string",
      "enum": [
        "Exercise",
        "Social",
        "Educational",
        "Therapy",
        "Medical",
        "Recreation",
        "Meals",
        "Other"
      ],
      "description": "Activity category"
    },
    "max_participants": {
      "type": "integer",
      "description": "Maximum number of participants"
    },
    "staff_assigned": {
      "type": "string",
      "description": "Staff member responsible"
    },
    "recurring": {
      "type": "boolean",
      "default": false,
      "description": "Is this a recurring activity"
    }
  },
  "required": [
    "title",
    "location",
    "date",
    "start_time",
    "end_time"
  ]
}