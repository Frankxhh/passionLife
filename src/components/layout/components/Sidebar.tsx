import * as React from 'react';
import { Dumbbell, Home, Plus, Utensils } from 'lucide-react';

import { DatePicker } from './DatePicker';
import { NavHeader } from './NavHeader';
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarRail,
  SidebarSeparator,
} from '@/components/ui/sidebar';
import Link from 'next/link';

const navBar = [
  {
    title: '首页',
    icon: <Home size={24} />,
    url: '/',
  },
  {
    title: '训练',
    icon: <Dumbbell size={24} />,
    url: '/trainingPlan',
  },
  {
    title: '饮食',
    icon: <Utensils size={24} />,
    url: '/dietPlan',
  },
];

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  console.log(props, 'props');
  return (
    <Sidebar>
      <SidebarHeader className="h-16 border-b border-sidebar-border">
        <NavHeader />
      </SidebarHeader>
      <SidebarContent>
        <DatePicker />
        <SidebarSeparator className="mx-0" />
        <SidebarMenu>
          {navBar.map(item => (
            <SidebarMenuItem key={item.title}>
              <SidebarMenuButton>
                {item.icon}
                <Link className={'w-full'} href={item.url}>
                  {item.title}
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
          ))}
        </SidebarMenu>
      </SidebarContent>
      <SidebarFooter>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton>
              <Plus />
              <span>New Calendar</span>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  );
}
