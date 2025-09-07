{
  "name": "MaintenanceRequest",
  "type": "object",
  "properties": {
    "title": {
      "type": "string",
      "description": "Brief description of issue"
    },
    "description": {
      "type": "string",
      "description": "Detailed description of maintenance needed"
    },
    "location": {
      "type": "string",
      "description": "Specific location (room number, area name)"
    },
    "priority": {
      "type": "string",
      "enum": [
        "low",
        "medium",
        "high",
        "urgent"
      ],
      "default": "medium",
      "description": "Priority level"
    },
    "category": {
      "type": "string",
      "enum": [
        "Plumbing",
        "Electrical",
        "HVAC",
        "Flooring",
        "Painting",
        "Appliances",
        "Safety",
        "Other"
      ],
      "description": "Maintenance category"
    },
    "status": {
      "type": "string",
      "enum": [
        "open",
        "in_progress",
        "completed",
        "cancelled"
      ],
      "default": "open",
      "description": "Request status"
    },
    "reported_by": {
      "type": "string",
      "description": "Person who reported the issue"
    },
    "assigned_to": {
      "type": "string",
      "description": "Staff member or contractor assigned"
    },
    "completion_date": {
      "type": "string",
      "format": "date",
      "description": "Date completed"
    },
    "cost": {
      "type": "number",
      "description": "Cost of repair/maintenance"
    }
  },
  "required": [
    "title",
    "description",
    "location"
  ]
}