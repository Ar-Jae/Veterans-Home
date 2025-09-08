export function createPageUrl(name){
  // simple mapping to friendly paths; adjust as needed
  const map = {
  Dashboard: '/dashboard',
    Residents: '/residents',
    Rooms: '/rooms',
    FloorPlan: '/floorplan',
    Activities: '/activities',
    Maintenance: '/maintenance',
  AddResident: '/add-resident',
  Meals: '/meals',
  Finances: '/finances',
  Incidents: '/incidents',
  Payments: '/payments',
  Reports: '/reports',
  Staff: '/staff'
  }
  return map[name] || '/'
}
