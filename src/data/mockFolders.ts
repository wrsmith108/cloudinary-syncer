import { FolderNode } from "@/types/folder";

export const initialFolders: FolderNode[] = [
  {
    id: "1",
    name: "Product Images",
    status: "synced",
    lastSync: "2024-02-20T10:00:00",
    children: [
      {
        id: "1-1",
        name: "Summer Collection 2024",
        status: "synced",
        lastSync: "2024-02-20T10:00:00",
        children: [
          {
            id: "1-1-1",
            name: "Apparel",
            status: "synced",
            lastSync: "2024-02-20T09:30:00"
          },
          {
            id: "1-1-2",
            name: "Accessories",
            status: "pending"
          }
        ]
      },
      {
        id: "1-2",
        name: "Winter Collection 2023",
        status: "error",
        lastSync: "2024-02-19T15:45:00",
        children: [
          {
            id: "1-2-1",
            name: "Outerwear",
            status: "error",
            lastSync: "2024-02-19T15:45:00"
          },
          {
            id: "1-2-2",
            name: "Footwear",
            status: "synced",
            lastSync: "2024-02-19T14:20:00"
          }
        ]
      }
    ]
  },
  {
    id: "2",
    name: "Marketing Assets",
    status: "synced",
    lastSync: "2024-02-19T15:30:00",
    children: [
      {
        id: "2-1",
        name: "Social Media",
        status: "synced",
        lastSync: "2024-02-19T15:30:00",
        children: [
          {
            id: "2-1-1",
            name: "Instagram Stories",
            status: "pending"
          },
          {
            id: "2-1-2",
            name: "Facebook Ads",
            status: "synced",
            lastSync: "2024-02-19T15:00:00"
          }
        ]
      },
      {
        id: "2-2",
        name: "Email Campaigns",
        status: "error",
        lastSync: "2024-02-18T11:20:00",
        children: [
          {
            id: "2-2-1",
            name: "Newsletter Templates",
            status: "error",
            lastSync: "2024-02-18T11:20:00"
          },
          {
            id: "2-2-2",
            name: "Promotional Banners",
            status: "synced",
            lastSync: "2024-02-18T10:45:00"
          }
        ]
      }
    ]
  },
  {
    id: "3",
    name: "Lifestyle Photos",
    status: "synced",
    lastSync: "2024-02-18T09:15:00",
    children: [
      {
        id: "3-1",
        name: "Studio Shots",
        status: "synced",
        lastSync: "2024-02-18T09:15:00",
        children: [
          {
            id: "3-1-1",
            name: "Product Lifestyle",
            status: "synced",
            lastSync: "2024-02-18T09:00:00"
          },
          {
            id: "3-1-2",
            name: "Model Photos",
            status: "pending"
          }
        ]
      },
      {
        id: "3-2",
        name: "Location Shoots",
        status: "synced",
        lastSync: "2024-02-17T16:30:00",
        children: [
          {
            id: "3-2-1",
            name: "Urban Collection",
            status: "synced",
            lastSync: "2024-02-17T16:30:00"
          },
          {
            id: "3-2-2",
            name: "Beach Collection",
            status: "synced",
            lastSync: "2024-02-17T15:45:00"
          }
        ]
      }
    ]
  }
];
