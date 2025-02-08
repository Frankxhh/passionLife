'use client';
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
  useSidebar,
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
    url: '/training',
  },
  {
    title: '饮食',
    icon: <Utensils size={24} />,
    url: '/diet',
  },
];

export const AppSidebar: React.FC = () => {
  const { setOpenMobile } = useSidebar();

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
                <Link
                  onClick={() => {
                    setOpenMobile(false);
                  }}
                  className={'w-full'}
                  href={item.url}
                >
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
};
