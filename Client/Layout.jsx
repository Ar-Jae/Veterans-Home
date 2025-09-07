import React from "react";
import { Link, useLocation } from "react-router-dom";
import { createPageUrl } from "@/utils";
import { 
  Home, 
  Users, 
  Building, 
  Calendar,
  Wrench,
  ChefHat,
  Map,
} from "lucide-react";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarHeader,
  SidebarFooter,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar";

const navigationItems = [
  {
    title: "Dashboard",
    url: createPageUrl("Dashboard"),
    icon: Home,
  },
  {
    title: "Residents",
    url: createPageUrl("Residents"),
    icon: Users,
  },
  {
    title: "Rooms",
    url: createPageUrl("Rooms"),
    icon: Building,
  },
  {
    title: "Floor Plan",
    url: createPageUrl("FloorPlan"),
    icon: Map,
  },
  {
    title: "Activities",
    url: createPageUrl("Activities"),
    icon: Calendar,
  },
  {
    title: "Maintenance",
    url: createPageUrl("Maintenance"),
    icon: Wrench,
  },
  {
    title: "Meal Planning",
    url: createPageUrl("Meals"),
    icon: ChefHat,
  },
];

export default function Layout({ children, currentPageName }) {
  const location = useLocation();

  return (
    <SidebarProvider>
  <div style={{minHeight:'100vh',display:'flex',width:'100%',background:'linear-gradient(120deg,#f3f4f6 0%,#e0e7ff 100%)'}}>
        {/* Sidebar */}
  <Sidebar style={{borderRight:'1px solid #e0e7ff',background:'linear-gradient(135deg,#6366f1 0%,#60a5fa 100%)',boxShadow:'0 8px 32px 0 rgba(60,72,100,0.12)',backdropFilter:'blur(8px)',WebkitBackdropFilter:'blur(8px)',position:'relative',margin:'24px 0 24px 24px'}}>
          <SidebarHeader style={{borderBottom:'1px solid #e0e7ff',padding:'1.5rem',background:'rgba(255,255,255,0.18)',borderTopLeftRadius:16,borderTopRightRadius:16,boxShadow:'0 2px 8px 0 rgba(60,72,100,0.10)'}}>
            <div style={{display:'flex',alignItems:'center',gap:14}}>
              <div style={{width:44,height:44,background:'linear-gradient(90deg,#6366f1 0%,#60a5fa 100%)',borderRadius:14,display:'flex',alignItems:'center',justifyContent:'center',boxShadow:'0 4px 16px 0 rgba(60,72,100,0.18)'}}>
                <Home style={{width:24,height:24,color:'#fff'}} />
              </div>
              <div>
                <h2 style={{fontWeight:900,color:'#222',fontSize:'1.25rem',marginBottom:2,letterSpacing:'-1px',textShadow:'0 2px 8px rgba(60,72,100,0.10)'}}>Veterans Home</h2>
                <p style={{fontSize:'0.85rem',color:'#222',fontWeight:600,textShadow:'0 2px 8px rgba(60,72,100,0.10)'}}>Management System</p>
              </div>
            </div>
          </SidebarHeader>
          
        <SidebarContent style={{padding:'1.2rem',background:'rgba(255,255,255,0.10)',borderBottomLeftRadius:16,borderBottomRightRadius:16}}>
            <SidebarGroup>
      <SidebarGroupLabel style={{fontSize:'0.85rem',fontWeight:800,color:'#222',textTransform:'uppercase',letterSpacing:'1px',padding:'0.5rem 1rem',textShadow:'0 2px 8px rgba(60,72,100,0.10)'}}>Navigation</SidebarGroupLabel>
              <SidebarGroupContent>
                <SidebarMenu>
                  {navigationItems.map((item) => (
                    <SidebarMenuItem key={item.title}>
                      <SidebarMenuButton
                        asChild
                        style={{
                          display:'flex',alignItems:'center',gap:14,padding:'1rem 1.3rem',borderRadius:12,transition:'all 0.2s',
                          background: location.pathname === item.url ? 'linear-gradient(90deg,#6366f1 0%,#2563eb 100%)' : 'rgba(255,255,255,0.10)',
                          color: location.pathname === item.url ? '#fff' : '#222',
                          fontWeight: location.pathname === item.url ? 800 : 500,
                          boxShadow: location.pathname === item.url ? '0 4px 16px 0 rgba(60,72,100,0.18)' : 'none',
                          cursor:'pointer',
                          border: location.pathname === item.url ? '2px solid #fff' : '2px solid transparent',
                          backdropFilter:'blur(2px)',
                          WebkitBackdropFilter:'blur(2px)',
                        }}
                      >
                        <Link to={item.url} style={{display:'flex',alignItems:'center',gap:14,color:'inherit',textDecoration:'none'}}>
                          <item.icon style={{width:22,height:22,color:'#222'}} />
                          <span style={{fontWeight:'inherit',fontSize:'1.08rem',letterSpacing:'-0.5px',color: location.pathname === item.url ? '#fff' : '#222'}}>{item.title}</span>
                        </Link>
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                  ))}
                </SidebarMenu>
              </SidebarGroupContent>
            </SidebarGroup>

            <SidebarGroup className="mt-6">
      <SidebarGroupLabel style={{fontSize:'0.85rem',fontWeight:800,color:'#222',textTransform:'uppercase',letterSpacing:'1px',padding:'0.5rem 1rem',textShadow:'0 2px 8px rgba(60,72,100,0.10)'}}>Facility Info</SidebarGroupLabel>
              <SidebarGroupContent>
                <div style={{padding:'1.2rem',fontSize:'1rem',background:'rgba(255,255,255,0.18)',borderRadius:12,margin:'0 0.5rem',boxShadow:'0 2px 8px 0 rgba(60,72,100,0.10)',color:'#222'}}>
                  <div style={{display:'flex',alignItems:'center',justifyContent:'space-between',marginBottom:8}}>
                    <span style={{color:'#222'}}>Total Capacity</span>
                    <span style={{fontWeight:800,color:'#222'}}>20 residents</span>
                  </div>
                  <div style={{display:'flex',alignItems:'center',justifyContent:'space-between',marginBottom:8}}>
                    <span style={{color:'#222'}}>Floors</span>
                    <span style={{fontWeight:800,color:'#222'}}>2</span>
                  </div>
                  <div style={{display:'flex',alignItems:'center',justifyContent:'space-between'}}>
                    <span style={{color:'#222'}}>Total Space</span>
                    <span style={{fontWeight:800,color:'#222'}}>10,000 ft²</span>
                  </div>
                </div>
              </SidebarGroupContent>
            </SidebarGroup>
          </SidebarContent>

          <SidebarFooter style={{borderTop:'1px solid #e0e7ff',padding:'1.2rem',background:'rgba(255,255,255,0.10)',borderBottomLeftRadius:16,borderBottomRightRadius:16}}>
            <div style={{display:'flex',alignItems:'center',gap:12}}>
              <div style={{width:36,height:36,background:'linear-gradient(90deg,#6366f1 0%,#2563eb 100%)',borderRadius:'9999px',display:'flex',alignItems:'center',justifyContent:'center',boxShadow:'0 2px 8px 0 rgba(60,72,100,0.10)'}}>
                <span style={{color:'#fff',fontWeight:700,fontSize:'1.08rem'}}>S</span>
              </div>
              <div style={{flex:1,minWidth:0}}>
                <p style={{fontWeight:700,color:'#222',fontSize:'1rem',marginBottom:2,whiteSpace:'nowrap',overflow:'hidden',textOverflow:'ellipsis',textShadow:'0 2px 8px rgba(60,72,100,0.10)'}}>Staff Member</p>
                <p style={{fontSize:'0.85rem',color:'#222',whiteSpace:'nowrap',overflow:'hidden',textOverflow:'ellipsis',textShadow:'0 2px 8px rgba(60,72,100,0.10)'}}>Veterans Home Staff</p>
              </div>
            </div>
          </SidebarFooter>
        </Sidebar>

        {/* Main Content */}
  <main style={{flex:1,display:'flex',flexDirection:'column',background:'none'}}>
          {/* Mobile header */}
          <header style={{background:'#fff',borderBottom:'1px solid #e5e7eb',padding:'1rem 1.5rem',display:'none'}}>
            <div style={{display:'flex',alignItems:'center',justifyContent:'space-between'}}>
              <SidebarTrigger style={{background:'#f3f4f6',padding:8,borderRadius:8,transition:'background 0.2s'}} />
              <h1 style={{fontWeight:800,fontSize:'1.2rem',color:'#374151'}}>Veterans Home</h1>
              <div style={{width:40}}></div>
            </div>
          </header>

          {/* Page content (render routed pages here) */}
          <div style={{flex:1,overflow:'auto',padding:'0'}}>
            <div style={{maxWidth:1200,margin:'0 auto',padding:'0'}}>
              {children}
            </div>
          </div>
        </main>
      </div>
    </SidebarProvider>
  );
}
