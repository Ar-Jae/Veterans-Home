import React from 'react';
import { Button, Popover, PopoverTrigger, PopoverContent, PopoverArrow, PopoverBody, Portal } from "@chakra-ui/react";
import { HelpCircle } from "lucide-react";

const legendItems = [
  { color: 'bg-pink-200', label: 'Bedroom' },
  { color: 'bg-yellow-200', label: 'Bathroom' },
  { color: 'bg-blue-200', label: 'Common Area' },
  { color: 'bg-orange-200', label: 'Office' },
  { color: 'bg-slate-300', label: 'Utility' },
  { color: 'bg-green-300', label: 'Vacant Status' },
  { color: 'bg-orange-300', label: 'Maintenance Status' },
];

export default function Legend() {
  return (
    <Popover>
      <PopoverTrigger>
        <Button size="sm" variant="outline" leftIcon={<HelpCircle className="w-4 h-4" />}>Legend</Button>
      </PopoverTrigger>
      <Portal>
        <PopoverContent w="56">
          <PopoverArrow />
          <PopoverBody>
            <div className="space-y-2">
              <h4 className="font-medium leading-none">Floor Plan Legend</h4>
              <div className="grid gap-2">
                {legendItems.map(item => (
                  <div key={item.label} className="flex items-center">
                    <div className={`w-4 h-4 rounded-sm mr-2 ${item.color}`} />
                    <span className="text-sm">{item.label}</span>
                  </div>
                ))}
              </div>
            </div>
          </PopoverBody>
        </PopoverContent>
      </Portal>
    </Popover>
  );
}