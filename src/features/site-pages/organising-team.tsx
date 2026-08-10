"use client";

import React, { useEffect, useRef, useState } from "react";
import BodyClassManager from '@/components/BodyClassManager';

type Organiser = {
  id: string;
  name: string;
  role: string;
  phone: string;
  image: string;
  initials: string;
  founder?: boolean;
  objectPosition?: string;
};

const ORGANISERS: Organiser[] = [
  {
    "id": "brijesh-prajapati",
    "name": "Vd. Brijesh Prajapati",
    "role": "Founder",
    "phone": "+91 63910 53105",
    "image": "/uploads/2026/06/Vd.-Brijesh.jpeg",
    "initials": "BP",
    "founder": true
  },
  {
    "id": "roopesh-jauhari",
    "name": "Vd. Roopesh Jauhari",
    "role": "Director",
    "phone": "+91 91400 13151",
    "image": "/uploads/2026/06/Vd.-Roopesh-Jauhari-In-Nehru-Jacket--scaled.jpg",
    "initials": "RJ"
  },
  {
    "id": "awadh-raj-shukla",
    "name": "Vd. Awadh Raj Shukla",
    "role": "Director",
    "phone": "+91 95804 90006",
    "image": "/uploads/2026/06/Vd.-Awadh-RAJ-Shukla-scaled.jpg",
    "initials": "AS",
    "objectPosition": "center 15%"
  },
  {
    "id": "karan-gupta",
    "name": "Vd. Karan Gupta",
    "role": "Director",
    "phone": "+91 76074 96051",
    "image": "/uploads/2026/06/vD.-kARAN-GUPTA.png",
    "initials": "KG",
    "objectPosition": "center 12%"
  },
  {
    "id": "shubham-sharma",
    "name": "Vd. Shubham Sharma",
    "role": "Director",
    "phone": "+91 96163 65088",
    "image": "/uploads/2026/06/Vd.-Shubham-Sharma-Director-Ayurvedam-Foundation-%F0%9F%93%9E-91-9616365088.jpeg",
    "initials": "SS"
  }
];

type Member = {
  id: string;
  name: string;
  phone: string;
  image: string;
  initials: string;
};

const MEMBERS: Member[] = [
  {
    "id": "pooja",
    "name": "Vd. Pooja",
    "phone": "+91 89576 04094",
    "image": "/uploads/2026/06/Vait_andya-Pooja-scaled.jpeg",
    "initials": "P"
  },
  {
    "id": "pratik-yadav",
    "name": "Vd. Pratik Yadav",
    "phone": "+91 94557 41299",
    "image": "/uploads/2026/06/Vd.-Pratik-Yadav-%F0%9F%93%9E-91-9455741299-scaled.jpeg",
    "initials": "PY"
  },
  {
    "id": "sandhya-yadav",
    "name": "Vd. Sandhya K. Yadav",
    "phone": "+91 87260 29327",
    "image": "/uploads/2026/06/Vd.-Sandhya-Kailash-Yadav%F0%9F%93%9E-91-8726029327.jpeg",
    "initials": "SY"
  },
  {
    "id": "arjun-gupta",
    "name": "Vd. Arjun Gupta",
    "phone": "+91 75994 67075",
    "image": "/uploads/2026/06/Vd.-Arjun-Gupta-in-Nehru-Jacket-scaled.jpg",
    "initials": "AG"
  },
  {
    "id": "abhishek-prajapati",
    "name": "Vd. Abhishek Prajapati",
    "phone": "+91 79067 75639",
    "image": "/uploads/2026/06/Vd.-Abhay-Singh.jpg",
    "initials": "AP"
  },
  {
    "id": "payal-tiwari",
    "name": "Vd. Payal Tiwari",
    "phone": "+91 73929 03366",
    "image": "",
    "initials": "P"
  },
  {
    "id": "aditi-nandal",
    "name": "Vd. Aditi Nandal",
    "phone": "+91 95182 79058",
    "image": "/uploads/2026/06/Vd.-Aditi-Nandal-%F0%9F%93%9E-91-9518279058.png",
    "initials": "AN"
  },
  {
    "id": "prabhat-sharma",
    "name": "Vd. Prabhat Sharma",
    "phone": "+91 74808 77092",
    "image": "/uploads/2026/06/Vd.-Prabhat-Sharma-scaled.jpeg",
    "initials": "PS"
  },
  {
    "id": "shivam-bhardwaj",
    "name": "Vd. Shivam Bhardwaj",
    "phone": "+91 94501 33516",
    "image": "/uploads/2026/06/Vd.-Shivam-Bhardwaj-%F0%9F%93%9E-91-9450133516.jpeg",
    "initials": "SB"
  },
  {
    "id": "abhay-singh",
    "name": "Vd. Abhay Singh",
    "phone": "+91 99362 26238",
    "image": "/uploads/2026/06/Vd.-Abhay-Singh.jpg",
    "initials": "AS"
  },
  {
    "id": "shubham-gupta",
    "name": "Vd. Shubham Gupta",
    "phone": "+91 95547 11130",
    "image": "/uploads/2026/06/Vd.-Shubham-Gupta-%F0%9F%93%9E-91-9554711130.dng",
    "initials": "SG"
  },
  {
    "id": "kajal-adhikari",
    "name": "Vd. Kajal Adhikari",
    "phone": "+91 95609 40734",
    "image": "/uploads/2026/06/Vd.-Kajal-Adhikari-%E2%80%93-91-95609-40734.jpeg",
    "initials": "KA"
  },
  {
    "id": "nitika-saini",
    "name": "Vd. Nitika Saini",
    "phone": "+91 70183 05727",
    "image": "/uploads/2026/06/Vd.-Nitika-Saini-%E2%80%93-91-70183-05727.jpeg",
    "initials": "NS"
  },
  {
    "id": "seema-bunkar",
    "name": "Vd. Seema Bunkar",
    "phone": "+91 91729 69027",
    "image": "/uploads/2026/06/Vd.-Seema-Bunkar-%E2%80%93-91-91729-6902734-scaled.jpeg",
    "initials": "SB"
  },
  {
    "id": "astha-verma",
    "name": "Vd. Astha Verma",
    "phone": "+91 95281 44056",
    "image": "/uploads/2026/06/Vd.-Astha-Verma-91-95281-44056.jpeg",
    "initials": "AV"
  },
  {
    "id": "namrta-yadav",
    "name": "Vd. Namrta Yadav",
    "phone": "+91 70393 16989",
    "image": "/uploads/2026/06/Vd.-Namrta-Yadav-scaled.jpg",
    "initials": "NY"
  },
  {
    "id": "shailza-sharma",
    "name": "Vd. Shailza Sharma",
    "phone": "+91 93063 53239",
    "image": "/uploads/2026/06/Vd.-Shailza-Sharma-91-93063-53239.jpeg",
    "initials": "SS"
  },
  {
    "id": "anjali-garg",
    "name": "Vd. Anjali Garg",
    "phone": "+91 78141 68390",
    "image": "/uploads/2026/06/Dr.-Anjali-Garg-7814168390.png",
    "initials": "AG"
  },
  {
    "id": "brijesh-patel",
    "name": "Vd. Brijesh Patel",
    "phone": "+91 62630 38442",
    "image": "/uploads/2026/06/Vd.-Brajesh-Patel.png",
    "initials": "BP"
  },
  {
    "id": "harsh-bansal",
    "name": "Vd. Harsh Bansal",
    "phone": "+91 99270 69634",
    "image": "/uploads/2026/06/Vd.-Harsh-Bansal-%E2%80%93-91-99270-69634.jpeg",
    "initials": "HB"
  },
  {
    "id": "apoorv-tripathi",
    "name": "Vd. Apoorv Tripathi",
    "phone": "+91 87340 13392",
    "image": "/uploads/2026/06/Vd.-Apoorva-Tripathi-scaled.jpg",
    "initials": "AT"
  },
  {
    "id": "arjun-nanda",
    "name": "Vd. Arjun Nanda",
    "phone": "+91 84450 50131",
    "image": "/uploads/2026/06/Vd.-Arjun-Nanda-91-84450-50131.jpeg",
    "initials": "AN"
  },
  {
    "id": "priyansh-shuwalka",
    "name": "Vd. Priyansh Shuwalka",
    "phone": "+91 63677 53817",
    "image": "/uploads/2026/06/Priyansh-Shuwalka.png",
    "initials": "PS"
  },
  {
    "id": "shubham-suxena",
    "name": "Vd. Shubham Suxena",
    "phone": "+91 99346 23560",
    "image": "/uploads/2026/06/Vd.-Shubham-Suxena-%E2%80%93-91-99346-23560-1.jpeg",
    "initials": "SS"
  },
  {
    "id": "saikiran",
    "name": "Vd. Saikiran",
    "phone": "+91 93595 58503",
    "image": "/uploads/2026/06/Vd.-Saikiran-%E2%80%93-91-93595-58503.jpeg",
    "initials": "S"
  },
  {
    "id": "vikrant-tripathi",
    "name": "Vd. Vikrant Tripathi",
    "phone": "+91 89539 20558",
    "image": "/uploads/2026/06/Vd.-Vikrant-Tripathi-%E2%80%93-91-89539-20558-scaled.jpeg",
    "initials": "VT"
  },
  {
    "id": "vinay-bhanu-singh",
    "name": "Vd. Vinay Bhanu Singh",
    "phone": "+91 94533 81438",
    "image": "/uploads/2026/06/Vd.-Vinay-Bhanu-Singh-scaled.jpg",
    "initials": "VB"
  },
  {
    "id": "vikki-kumar",
    "name": "Vd. Vikki Kumar",
    "phone": "+91 96286 29274",
    "image": "/uploads/2026/06/Vd.-Vikki-Kumar-91-96286-29274.jpeg",
    "initials": "VK"
  },
  {
    "id": "aditya-singh",
    "name": "Vd. Aditya Singh",
    "phone": "+91 78803 18418",
    "image": "/uploads/2026/06/Vd.-Aditya-Singh-91-78803-18418.png",
    "initials": "AS"
  },
  {
    "id": "rahul-kaushik",
    "name": "Vd. Rahul Kaushik",
    "phone": "+91 96915 27004",
    "image": "/uploads/2026/06/Rahul-Kaushik-9691527004-scaled.jpeg",
    "initials": "RK"
  },
  {
    "id": "manish-kumar",
    "name": "Vd. Manish Kumar",
    "phone": "+91 62894 06425",
    "image": "/uploads/2026/06/Vd.-Manish-Kumar-Taking-Award-1-1-scaled.jpg",
    "initials": "MK"
  }
];

const SCALLOP_PATH_CORE = "M 142.0,74.0 L 141.46,75.77 L 139.92,77.45 L 137.66,79.01 L 135.04,80.42 L 132.5,81.7 L 130.44,82.94 L 129.19,84.23 L 128.9,85.67 L 129.57,87.34 L 130.99,89.27 L 132.85,91.43 L 134.73,93.73 L 136.23,96.04 L 137.0,98.18 L 136.82,100.02 L 135.65,101.45 L 133.58,102.42 L 130.89,102.99 L 127.94,103.28 L 125.1,103.5 L 122.72,103.86 L 121.08,104.57 L 120.26,105.79 L 120.23,107.59 L 120.81,109.92 L 121.7,112.62 L 122.56,115.47 L 123.06,118.17 L 122.95,120.45 L 122.08,122.08 L 120.45,122.95 L 118.17,123.06 L 115.47,122.56 L 112.62,121.7 L 109.92,120.81 L 107.59,120.23 L 105.79,120.26 L 104.57,121.08 L 103.86,122.72 L 103.5,125.1 L 103.28,127.94 L 102.99,130.89 L 102.42,133.58 L 101.45,135.65 L 100.02,136.82 L 98.18,137.0 L 96.04,136.23 L 93.73,134.73 L 91.43,132.85 L 89.27,130.99 L 87.34,129.57 L 85.67,128.9 L 84.23,129.19 L 82.94,130.44 L 81.7,132.5 L 80.42,135.04 L 79.01,137.66 L 77.45,139.92 L 75.77,141.46 L 74.0,142.0 L 72.23,141.46 L 70.55,139.92 L 68.99,137.66 L 67.58,135.04 L 66.3,132.5 L 65.06,130.44 L 63.77,129.19 L 62.33,128.9 L 60.66,129.57 L 58.73,130.99 L 56.57,132.85 L 54.27,134.73 L 51.96,136.23 L 49.82,137.0 L 47.98,136.82 L 46.55,135.65 L 45.58,133.58 L 45.01,130.89 L 44.72,127.94 L 44.5,125.1 L 44.14,122.72 L 43.43,121.08 L 42.21,120.26 L 40.41,120.23 L 38.08,120.81 L 35.38,121.7 L 32.53,122.56 L 29.83,123.06 L 27.55,122.95 L 25.92,122.08 L 25.05,120.45 L 24.94,118.17 L 25.44,115.47 L 26.3,112.62 L 27.19,109.92 L 27.77,107.59 L 27.74,105.79 L 26.92,104.57 L 25.28,103.86 L 22.9,103.5 L 20.06,103.28 L 17.11,102.99 L 14.42,102.42 L 12.35,101.45 L 11.18,100.02 L 11.0,98.18 L 11.77,96.04 L 13.27,93.73 L 15.15,91.43 L 17.01,89.27 L 18.43,87.34 L 19.1,85.67 L 18.81,84.23 L 17.56,82.94 L 15.5,81.7 L 12.96,80.42 L 10.34,79.01 L 8.08,77.45 L 6.54,75.77 L 6.0,74.0 L 6.54,72.23 L 8.08,70.55 L 10.34,68.99 L 12.96,67.58 L 15.5,66.3 L 17.56,65.06 L 18.81,63.77 L 19.1,62.33 L 18.43,60.66 L 17.01,58.73 L 15.15,56.57 L 13.27,54.27 L 11.77,51.96 L 11.0,49.82 L 11.18,47.98 L 12.35,46.55 L 14.42,45.58 L 17.11,45.01 L 20.06,44.72 L 22.9,44.5 L 25.28,44.14 L 26.92,43.43 L 27.74,42.21 L 27.77,40.41 L 27.19,38.08 L 26.3,35.38 L 25.44,32.53 L 24.94,29.83 L 25.05,27.55 L 25.92,25.92 L 27.55,25.05 L 29.83,24.94 L 32.53,25.44 L 35.38,26.3 L 38.08,27.19 L 40.41,27.77 L 42.21,27.74 L 43.43,26.92 L 44.14,25.28 L 44.5,22.9 L 44.72,20.06 L 45.01,17.11 L 45.58,14.42 L 46.55,12.35 L 47.98,11.18 L 49.82,11.0 L 51.96,11.77 L 54.27,13.27 L 56.57,15.15 L 58.73,17.01 L 60.66,18.43 L 62.33,19.1 L 63.77,18.81 L 65.06,17.56 L 66.3,15.5 L 67.58,12.96 L 68.99,10.34 L 70.55,8.08 L 72.23,6.54 L 74.0,6.0 L 75.77,6.54 L 77.45,8.08 L 79.01,10.34 L 80.42,12.96 L 81.7,15.5 L 82.94,17.56 L 84.23,18.81 L 85.67,19.1 L 87.34,18.43 L 89.27,17.01 L 91.43,15.15 L 93.73,13.27 L 96.04,11.77 L 98.18,11.0 L 100.02,11.18 L 101.45,12.35 L 102.42,14.42 L 102.99,17.11 L 103.28,20.06 L 103.5,22.9 L 103.86,25.28 L 104.57,26.92 L 105.79,27.74 L 107.59,27.77 L 109.92,27.19 L 112.62,26.3 L 115.47,25.44 L 118.17,24.94 L 120.45,25.05 L 122.08,25.92 L 122.95,27.55 L 123.06,29.83 L 122.56,32.53 L 121.7,35.38 L 120.81,38.08 L 120.23,40.41 L 120.26,42.21 L 121.08,43.43 L 122.72,44.14 L 125.1,44.5 L 127.94,44.72 L 130.89,45.01 L 133.58,45.58 L 135.65,46.55 L 136.82,47.98 L 137.0,49.82 L 136.23,51.96 L 134.73,54.27 L 132.85,56.57 L 130.99,58.73 L 129.57,60.66 L 128.9,62.33 L 129.19,63.77 L 130.44,65.06 L 132.5,66.3 L 135.04,67.58 L 137.66,68.99 L 139.92,70.55 L 141.46,72.23 L 142.0,74.0 Z";

const SCALLOP_PATH_MEMBER = "M 96.0,50.0 L 95.48,51.43 L 94.06,52.77 L 92.06,53.98 L 89.98,55.05 L 88.29,56.06 L 87.36,57.13 L 87.36,58.35 L 88.21,59.81 L 89.61,61.51 L 91.12,63.36 L 92.26,65.21 L 92.65,66.89 L 92.1,68.22 L 90.64,69.12 L 88.52,69.63 L 86.15,69.87 L 83.96,70.08 L 82.32,70.51 L 81.46,71.38 L 81.36,72.78 L 81.84,74.7 L 82.56,76.93 L 83.11,79.19 L 83.17,81.15 L 82.53,82.53 L 81.15,83.17 L 79.19,83.11 L 76.93,82.56 L 74.7,81.84 L 72.78,81.36 L 71.38,81.46 L 70.51,82.32 L 70.08,83.96 L 69.87,86.15 L 69.87,88.52 L 69.12,90.64 L 68.22,92.1 L 66.89,92.65 L 65.21,92.26 L 63.36,91.12 L 61.51,89.61 L 59.81,88.21 L 58.35,87.36 L 57.13,87.36 L 56.06,88.29 L 55.05,89.98 L 53.98,92.06 L 52.77,94.06 L 51.43,95.48 L 50.0,96.0 L 48.57,95.48 L 47.23,94.06 L 46.02,92.06 L 44.95,89.98 L 43.94,88.29 L 42.87,87.36 L 41.65,87.36 L 40.19,88.21 L 38.49,89.61 L 36.64,91.12 L 34.79,92.26 L 33.11,92.65 L 31.78,92.1 L 30.88,90.64 L 30.37,88.52 L 30.13,86.15 L 29.92,83.96 L 29.49,82.32 L 28.62,81.46 L 27.22,81.36 L 25.3,81.84 L 23.07,82.56 L 20.81,83.11 L 18.85,83.17 L 17.47,82.53 L 16.83,81.15 L 16.89,79.19 L 17.44,76.93 L 18.16,74.7 L 18.64,72.78 L 18.54,71.38 L 17.68,70.51 L 16.04,70.08 L 13.85,69.87 L 11.48,69.63 L 9.36,69.12 L 7.9,68.22 L 7.35,66.89 L 7.74,65.21 L 8.88,63.36 L 10.39,61.51 L 11.79,59.81 L 12.64,58.35 L 12.64,57.13 L 11.71,56.06 L 10.02,55.05 L 7.94,53.98 L 5.94,52.77 L 4.52,51.43 L 4.0,50.0 L 4.52,48.57 L 5.94,47.23 L 7.94,46.02 L 10.02,44.95 L 11.71,43.94 L 12.64,42.87 L 12.64,41.65 L 11.79,40.19 L 10.39,38.49 L 8.88,36.64 L 7.74,34.79 L 7.35,33.11 L 7.9,31.78 L 9.36,30.88 L 11.48,30.37 L 13.85,30.13 L 16.04,29.92 L 17.68,29.49 L 18.54,28.62 L 18.64,27.22 L 18.16,25.3 L 17.44,23.07 L 16.89,20.81 L 16.83,18.85 L 17.47,17.47 L 18.85,16.83 L 20.81,16.89 L 23.07,17.44 L 25.3,18.16 L 27.22,18.64 L 28.62,18.54 L 29.49,17.68 L 29.92,16.04 L 30.13,13.85 L 30.37,11.48 L 30.88,9.36 L 31.78,7.9 L 33.11,7.35 L 34.79,7.74 L 36.64,8.88 L 38.49,10.39 L 40.19,11.79 L 41.65,12.64 L 42.87,12.64 L 43.94,11.71 L 44.95,10.02 L 46.02,7.94 L 47.23,5.94 L 48.57,4.52 L 50.0,4.0 L 51.43,4.52 L 52.77,5.94 L 53.98,7.94 L 55.05,10.02 L 56.06,11.71 L 57.13,12.64 L 58.35,12.64 L 59.81,11.79 L 61.51,10.39 L 63.36,8.88 L 65.21,7.74 L 66.89,7.35 L 68.22,7.9 L 69.12,9.36 L 69.63,11.48 L 69.87,13.85 L 70.08,16.04 L 70.51,17.68 L 71.38,18.54 L 72.78,18.64 L 74.7,18.16 L 76.93,17.44 L 79.19,16.89 L 81.15,16.83 L 82.53,17.47 L 83.17,18.85 L 83.11,20.81 L 82.56,23.07 L 81.84,25.3 L 81.36,27.22 L 81.46,28.62 L 82.32,29.49 L 83.96,29.92 L 86.15,30.13 L 88.52,30.37 L 90.64,30.88 L 92.1,31.78 L 92.65,33.11 L 92.26,34.79 L 91.12,36.64 L 89.61,38.49 L 88.21,40.19 L 87.36,41.65 L 87.36,42.87 L 88.29,43.94 L 89.98,44.95 L 92.06,46.02 L 94.06,47.23 L 95.48,48.57 L 96.0,50.0 Z";

function useInView<T extends HTMLElement>(margin = "0px") {
  const ref = useRef<T | null>(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;

    if (!("IntersectionObserver" in window)) {
      const frame = requestAnimationFrame(() => setInView(true));
      return () => cancelAnimationFrame(frame);
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
          observer.unobserve(node);
        }
      },
      { threshold: 0.15, rootMargin: "0px 0px " + margin + " 0px" }
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, [margin]);

  return { ref, inView };
}

function OrganiserCard({
  organiser,
  gradientId,
  index,
}: {
  organiser: Organiser;
  gradientId: string;
  index: number;
}) {
  const { ref, inView } = useInView<HTMLDivElement>("-40px");
  const [imgFailed, setImgFailed] = useState(false);
  const [tilt, setTilt] = useState({ x: 0, y: 0 });

  function handleMouseMove(e: React.MouseEvent<HTMLDivElement>) {
    const rect = e.currentTarget.getBoundingClientRect();
    const px = (e.clientX - rect.left) / rect.width;
    const py = (e.clientY - rect.top) / rect.height;
    setTilt({
      x: (px - 0.5) * 14,
      y: -(py - 0.5) * 14,
    });
  }

  function handleMouseLeave() {
    setTilt({ x: 0, y: 0 });
  }

  return (
    <div
      ref={ref}
      className={"card " + (inView ? "in-view" : "")}
      style={{ transitionDelay: (index * 70) + "ms" }}
    >
      <div
        className="card-inner"
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        style={
          {
            "--tiltX": tilt.x + "deg",
            "--tiltY": tilt.y + "deg",
          } as React.CSSProperties
        }
      >
        {organiser.founder && <span className="founder-tag">FOUNDER</span>}

        <div className="medallion">
          <svg className="scallop" viewBox="0 0 148 148" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <linearGradient id={gradientId} x1="10%" y1="0%" x2="90%" y2="100%">
                <stop offset="0%" stopColor="#FCEBC0" />
                <stop offset="35%" stopColor="#E8C077" />
                <stop offset="70%" stopColor="#B8862E" />
                <stop offset="100%" stopColor="#6E4A14" />
              </linearGradient>
            </defs>
            <path d={SCALLOP_PATH_CORE} fill={"url(#" + gradientId + ")"} />
          </svg>
          <div className="bevel-ring" />
          <div className="bead-rim" />
          <div className="shine" />
          <div className="photo-wrap">
            {(!imgFailed && organiser.image && !organiser.image.includes("placehold")) ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                src={organiser.image}
                alt={organiser.name}
                onError={() => setImgFailed(true)}
                style={organiser.objectPosition ? { objectPosition: organiser.objectPosition } : undefined}
              />
            ) : (
              <img src="/uploads/2025/03/Untitled-design-6-e1742823184130.png" alt="Ayurvedam Foundation Logo" style={{ objectFit: "contain", padding: "12%", width: "100%", height: "100%", display: "block" }} />
            )}
          </div>
        </div>

        <h3 className="name">
          {organiser.name.split(" ").map((word, i, arr) => (
            <span key={i}>
              {word}
              {i < arr.length - 1 ? " " : ""}
            </span>
          ))}
        </h3>
        <p className="role">{organiser.role}</p>

        <a className="phone" href={"tel:" + organiser.phone.replace(/s+/g, "")}>
          <svg viewBox="0 0 24 24">
            <path d="M6.6 10.8c1.4 2.8 3.8 5.1 6.6 6.6l2.2-2.2c.3-.3.7-.4 1-.2 1.1.4 2.3.6 3.5.6.6 0 1 .4 1 1V20c0 .6-.4 1-1 1C10.9 21 3 13.1 3 3.1c0-.6.4-1 1-1h3.5c.6 0 1 .4 1 1 0 1.2.2 2.4.6 3.5.1.4 0 .8-.2 1L6.6 10.8z" />
          </svg>
          {organiser.phone}
        </a>
      </div>
    </div>
  );
}

function MemberCard({ member, gradientId, index }: { member: Member; gradientId: string; index: number }) {
  const { ref, inView } = useInView<HTMLDivElement>("-40px");
  const [imgFailed, setImgFailed] = useState(false);
  const [tilt, setTilt] = useState({ x: 0, y: 0 });

  function handleMouseMove(e: React.MouseEvent<HTMLDivElement>) {
    const rect = e.currentTarget.getBoundingClientRect();
    const px = (e.clientX - rect.left) / rect.width;
    const py = (e.clientY - rect.top) / rect.height;
    setTilt({ x: (px - 0.5) * 8, y: -(py - 0.5) * 8 });
  }

  function handleMouseLeave() {
    setTilt({ x: 0, y: 0 });
  }

  return (
    <div
      ref={ref}
      className={"card " + (inView ? "in-view" : "")}
      style={{ transitionDelay: ((index % 9) * 45) + "ms" }}
    >
      <div
        className="card-inner"
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        style={
          {
            "--tiltX": tilt.x + "deg",
            "--tiltY": tilt.y + "deg",
          } as React.CSSProperties
        }
      >
        <div className="medallion">
          <svg className="scallop" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <linearGradient id={gradientId} x1="10%" y1="0%" x2="90%" y2="100%">
                <stop offset="0%" stopColor="#FCEBC0" />
                <stop offset="35%" stopColor="#E8C077" />
                <stop offset="70%" stopColor="#B8862E" />
                <stop offset="100%" stopColor="#6E4A14" />
              </linearGradient>
            </defs>
            <path d={SCALLOP_PATH_MEMBER} fill={"url(#" + gradientId + ")"} />
          </svg>
          <div className="bevel-ring" />
          <div className="bead-rim" />
          <div className="shine" />
          <div className="photo-wrap">
            {(!imgFailed && member.image && !member.image.includes("placehold")) ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img src={member.image} alt={member.name} onError={() => setImgFailed(true)} />
            ) : (
              <img src="/uploads/2025/03/Untitled-design-6-e1742823184130.png" alt="Ayurvedam Foundation Logo" style={{ objectFit: "contain", padding: "12%", width: "100%", height: "100%", display: "block" }} />
            )}
          </div>
        </div>

        <div className="info">
          <h3 className="name">{member.name}</h3>
          {member.phone && (
            <a className="phone" href={"tel:" + member.phone.replace(/s+/g, "")}>
              <svg viewBox="0 0 24 24">
                <path d="M6.6 10.8c1.4 2.8 3.8 5.1 6.6 6.6l2.2-2.2c.3-.3.7-.4 1-.2 1.1.4 2.3.6 3.5.6.6 0 1 .4 1 1V20c0 .6-.4 1-1 1C10.9 21 3 13.1 3 3.1c0-.6.4-1 1-1h3.5c.6 0 1 .4 1 1 0 1.2.2 2.4.6 3.5.1.4 0 .8-.2 1L6.6 10.8z" />
              </svg>
              {member.phone}
            </a>
          )}
        </div>
      </div>
    </div>
  );
}

export default function Page() {
  return (
    <>
      <BodyClassManager className="wp-singular page-template page-template-elementor_header_footer page page-id-125 wp-custom-logo wp-embed-responsive wp-theme-hello-elementor theme-hello-elementor woocommerce-no-js hello-elementor-default elementor-default elementor-template-full-width elementor-kit-26 elementor-page elementor-page-125" />

            <link rel="stylesheet" id="swiper-bundle-min-css" href="/css/eventin-swiper-bundle.css" media="all" />
      <link rel="stylesheet" id="etn-blocks-style-css" href="/css/eventin-etn-block-styles.css" media="all" />
      <link rel="stylesheet" id="woocommerce-layout-css" href="/css/woocommerce-woocommerce-layout.css" media="all" />
      <link rel="stylesheet" id="woocommerce-smallscreen-css" href="/css/woocommerce-woocommerce-smallscreen.css" media="only screen and (max-width: 768px)" />
      <link rel="stylesheet" id="woocommerce-general-css" href="/css/woocommerce-woocommerce.css" media="all" />
      <link rel="stylesheet" id="etn-icon-css" href="/css/eventin-etn-icon.css" media="all" />
      <link rel="stylesheet" id="etn-public-css-css" href="/css/eventin-event-manager-public-styles.css" media="all" />
      <link rel="stylesheet" id="hello-elementor-css" href="/css/hello-reset.css" media="all" />
      <link rel="stylesheet" id="hello-elementor-theme-style-css" href="/css/hello-theme.css" media="all" />
      <link rel="stylesheet" id="hello-elementor-header-footer-css" href="/css/hello-header-footer.css" media="all" />
      <link rel="stylesheet" id="elementor-frontend-css" href="/css/elementor-frontend.css" media="all" />
      <link rel="stylesheet" id="elementor-post-26-css" href="/css/elementor-post-26.css" media="all" />
      <link rel="stylesheet" id="widget-icon-box-css" href="/css/elementor-widget-icon-box.css" media="all" />
      <link rel="stylesheet" id="widget-social-icons-css" href="/css/elementor-widget-social-icons.css" media="all" />
      <link rel="stylesheet" id="e-apple-webkit-css" href="/css/elementor-apple-webkit.css" media="all" />
      <link rel="stylesheet" id="widget-image-css" href="/css/elementor-widget-image.css" media="all" />
      <link rel="stylesheet" id="widget-nav-menu-css" href="/css/elementor-pro-widget-nav-menu.css" media="all" />
      <link rel="stylesheet" id="e-sticky-css" href="/css/elementor-pro-sticky.css" media="all" />
      <link rel="stylesheet" id="widget-icon-list-css" href="/css/elementor-widget-icon-list.css" media="all" />
      <link rel="stylesheet" id="widget-heading-css" href="/css/elementor-widget-heading.css" media="all" />
      <link rel="stylesheet" id="elementor-post-125-css" href="/css/elementor-post-125.css" media="all" />
      <link rel="stylesheet" id="elementor-post-113-css" href="/css/elementor-post-113.css" media="all" />
      <link rel="stylesheet" id="elementor-post-166-css" href="/css/elementor-post-166.css" media="all" />
      <link rel="stylesheet" id="etn-jquery-countdown-css" href="/css/eventin-jquery.countdown.css" media="all" />
      <link rel="stylesheet" id="etn-public-css" href="/css/eventin-etn-public.css" media="all" />
      <link rel="stylesheet" id="wp-components-css" href="/css/style-style.css" media="all" />
      <link rel="stylesheet" id="wp-preferences-css" href="/css/style-style.css" media="all" />
      <link rel="stylesheet" id="wp-block-editor-css" href="/css/style-style.css" media="all" />
      <link rel="stylesheet" id="ekit-widget-styles-css" href="/css/ekit-widget-styles.css" media="all" />
      <link rel="stylesheet" id="ekit-responsive-css" href="/css/ekit-responsive.css" media="all" />
      <link rel="stylesheet" id="elementor-gf-local-poppins-css" href="/css/elementor-poppins.css" media="all" />
      <link rel="stylesheet" id="elementor-gf-local-mulish-css" href="/css/elementor-mulish.css" media="all" />
      <link rel="stylesheet" id="elementor-gf-nokora-css" href="https://fonts.googleapis.com/css?family=Nokora:100,100italic,200,200italic,300,300italic,400,400italic,500,500italic,600,600italic,700,700italic,800,800italic,900,900italic&display=swap" media="all" />
      <link rel="stylesheet" id="elementor-icons-ekiticons-css" href="/css/ekit-ekiticons.css" media="all" />
      <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Fraunces:opsz,wght@9..144,300;9..144,400;9..144,500;9..144,600;9..144,700&family=Outfit:wght@300;400;500;600;700&family=JetBrains+Mono:wght@500;600&display=swap" media="all" />
      <link rel="stylesheet" id="wc-blocks-style-css" href="/css/woocommerce-wc-blocks.css" media="all" />
      <style id="wp-img-auto-sizes-contain-inline-css" dangerouslySetInnerHTML={{
        __html: `
img:is([sizes=auto i],[sizes^="auto," i]){contain-intrinsic-size:3000px 1500px}
/*# sourceURL=wp-img-auto-sizes-contain-inline-css */
`
      }} />
      <style id="wp-emoji-styles-inline-css" dangerouslySetInnerHTML={{
        __html: `

	img.wp-smiley, img.emoji {
		display: inline !important;
		border: none !important;
		box-shadow: none !important;
		height: 1em !important;
		width: 1em !important;
		margin: 0 0.07em !important;
		vertical-align: -0.1em !important;
		background: none !important;
		padding: 0 !important;
	}
/*# sourceURL=wp-emoji-styles-inline-css */
`
      }} />
      <style id="global-styles-inline-css" dangerouslySetInnerHTML={{
        __html: `
:root{--wp--preset--aspect-ratio--square: 1;--wp--preset--aspect-ratio--4-3: 4/3;--wp--preset--aspect-ratio--3-4: 3/4;--wp--preset--aspect-ratio--3-2: 3/2;--wp--preset--aspect-ratio--2-3: 2/3;--wp--preset--aspect-ratio--16-9: 16/9;--wp--preset--aspect-ratio--9-16: 9/16;--wp--preset--color--black: #000000;--wp--preset--color--cyan-bluish-gray: #abb8c3;--wp--preset--color--white: #ffffff;--wp--preset--color--pale-pink: #f78da7;--wp--preset--color--vivid-red: #cf2e2e;--wp--preset--color--luminous-vivid-orange: #ff6900;--wp--preset--color--luminous-vivid-amber: #fcb900;--wp--preset--color--light-green-cyan: #7bdcb5;--wp--preset--color--vivid-green-cyan: #00d084;--wp--preset--color--pale-cyan-blue: #8ed1fc;--wp--preset--color--vivid-cyan-blue: #0693e3;--wp--preset--color--vivid-purple: #9b51e0;--wp--preset--gradient--vivid-cyan-blue-to-vivid-purple: linear-gradient(135deg,rgb(6,147,227) 0%,rgb(155,81,224) 100%);--wp--preset--gradient--light-green-cyan-to-vivid-green-cyan: linear-gradient(135deg,rgb(122,220,180) 0%,rgb(0,208,130) 100%);--wp--preset--gradient--luminous-vivid-amber-to-luminous-vivid-orange: linear-gradient(135deg,rgb(252,185,0) 0%,rgb(255,105,0) 100%);--wp--preset--gradient--luminous-vivid-orange-to-vivid-red: linear-gradient(135deg,rgb(255,105,0) 0%,rgb(207,46,46) 100%);--wp--preset--gradient--very-light-gray-to-cyan-bluish-gray: linear-gradient(135deg,rgb(238,238,238) 0%,rgb(169,184,195) 100%);--wp--preset--gradient--cool-to-warm-spectrum: linear-gradient(135deg,rgb(74,234,220) 0%,rgb(151,120,209) 20%,rgb(207,42,186) 40%,rgb(238,44,130) 60%,rgb(251,105,98) 80%,rgb(254,248,76) 100%);--wp--preset--gradient--blush-light-purple: linear-gradient(135deg,rgb(255,206,236) 0%,rgb(152,150,240) 100%);--wp--preset--gradient--blush-bordeaux: linear-gradient(135deg,rgb(254,205,165) 0%,rgb(254,45,45) 50%,rgb(107,0,62) 100%);--wp--preset--gradient--luminous-dusk: linear-gradient(135deg,rgb(255,203,112) 0%,rgb(199,81,192) 50%,rgb(65,88,208) 100%);--wp--preset--gradient--pale-ocean: linear-gradient(135deg,rgb(255,245,203) 0%,rgb(182,227,212) 50%,rgb(51,167,181) 100%);--wp--preset--gradient--electric-grass: linear-gradient(135deg,rgb(202,248,128) 0%,rgb(113,206,126) 100%);--wp--preset--gradient--midnight: linear-gradient(135deg,rgb(2,3,129) 0%,rgb(40,116,252) 100%);--wp--preset--font-size--small: 13px;--wp--preset--font-size--medium: 20px;--wp--preset--font-size--large: 36px;--wp--preset--font-size--x-large: 42px;--wp--preset--spacing--20: 0.44rem;--wp--preset--spacing--30: 0.67rem;--wp--preset--spacing--40: 1rem;--wp--preset--spacing--50: 1.5rem;--wp--preset--spacing--60: 2.25rem;--wp--preset--spacing--70: 3.38rem;--wp--preset--spacing--80: 5.06rem;--wp--preset--shadow--natural: 6px 6px 9px rgba(0, 0, 0, 0.2);--wp--preset--shadow--deep: 12px 12px 50px rgba(0, 0, 0, 0.4);--wp--preset--shadow--sharp: 6px 6px 0px rgba(0, 0, 0, 0.2);--wp--preset--shadow--outlined: 6px 6px 0px -3px rgb(255, 255, 255), 6px 6px rgb(0, 0, 0);--wp--preset--shadow--crisp: 6px 6px 0px rgb(0, 0, 0);}:root { --wp--style--global--content-size: 800px;--wp--style--global--wide-size: 1200px; }:where(body) { margin: 0; }.wp-site-blocks > .alignleft { float: left; margin-right: 2em; }.wp-site-blocks > .alignright { float: right; margin-left: 2em; }.wp-site-blocks > .aligncenter { justify-content: center; margin-left: auto; margin-right: auto; }:where(.wp-site-blocks) > * { margin-block-start: 24px; margin-block-end: 0; }:where(.wp-site-blocks) > :first-child { margin-block-start: 0; }:where(.wp-site-blocks) > :last-child { margin-block-end: 0; }:root { --wp--style--block-gap: 24px; }:root :where(.is-layout-flow) > :first-child{margin-block-start: 0;}:root :where(.is-layout-flow) > :last-child{margin-block-end: 0;}:root :where(.is-layout-flow) > *{margin-block-start: 24px;margin-block-end: 0;}:root :where(.is-layout-constrained) > :first-child{margin-block-start: 0;}:root :where(.is-layout-constrained) > :last-child{margin-block-end: 0;}:root :where(.is-layout-constrained) > *{margin-block-start: 24px;margin-block-end: 0;}:root :where(.is-layout-flex){gap: 24px;}:root :where(.is-layout-grid){gap: 24px;}.is-layout-flow > .alignleft{float: left;margin-inline-start: 0;margin-inline-end: 2em;}.is-layout-flow > .alignright{float: right;margin-inline-start: 2em;margin-inline-end: 0;}.is-layout-flow > .aligncenter{margin-left: auto !important;margin-right: auto !important;}.is-layout-constrained > .alignleft{float: left;margin-inline-start: 0;margin-inline-end: 2em;}.is-layout-constrained > .alignright{float: right;margin-inline-start: 2em;margin-inline-end: 0;}.is-layout-constrained > .aligncenter{margin-left: auto !important;margin-right: auto !important;}.is-layout-constrained > :where(:not(.alignleft):not(.alignright):not(.alignfull)){max-width: var(--wp--style--global--content-size);margin-left: auto !important;margin-right: auto !important;}.is-layout-constrained > .alignwide{max-width: var(--wp--style--global--wide-size);}body .is-layout-flex{display: flex;}.is-layout-flex{flex-wrap: wrap;align-items: center;}.is-layout-flex > :is(*, div){margin: 0;}body .is-layout-grid{display: grid;}.is-layout-grid > :is(*, div){margin: 0;}body{padding-top: 0px;padding-right: 0px;padding-bottom: 0px;padding-left: 0px;}:root :where(.wp-element-button, .wp-block-button__link){background-color: #32373c;border-width: 0;color: #fff;font-family: inherit;font-size: inherit;font-style: inherit;font-weight: inherit;letter-spacing: inherit;line-height: inherit;padding-top: calc(0.667em + 2px);padding-right: calc(1.333em + 2px);padding-bottom: calc(0.667em + 2px);padding-left: calc(1.333em + 2px);text-decoration: none;text-transform: inherit;}.has-black-color{color: var(--wp--preset--color--black) !important;}.has-cyan-bluish-gray-color{color: var(--wp--preset--color--cyan-bluish-gray) !important;}.has-white-color{color: var(--wp--preset--color--white) !important;}.has-pale-pink-color{color: var(--wp--preset--color--pale-pink) !important;}.has-vivid-red-color{color: var(--wp--preset--color--vivid-red) !important;}.has-luminous-vivid-orange-color{color: var(--wp--preset--color--luminous-vivid-orange) !important;}.has-luminous-vivid-amber-color{color: var(--wp--preset--color--luminous-vivid-amber) !important;}.has-light-green-cyan-color{color: var(--wp--preset--color--light-green-cyan) !important;}.has-vivid-green-cyan-color{color: var(--wp--preset--color--vivid-green-cyan) !important;}.has-pale-cyan-blue-color{color: var(--wp--preset--color--pale-cyan-blue) !important;}.has-vivid-cyan-blue-color{color: var(--wp--preset--color--vivid-cyan-blue) !important;}.has-vivid-purple-color{color: var(--wp--preset--color--vivid-purple) !important;}.has-black-background-color{background-color: var(--wp--preset--color--black) !important;}.has-cyan-bluish-gray-background-color{background-color: var(--wp--preset--color--cyan-bluish-gray) !important;}.has-white-background-color{background-color: var(--wp--preset--color--white) !important;}.has-pale-pink-background-color{background-color: var(--wp--preset--color--pale-pink) !important;}.has-vivid-red-background-color{background-color: var(--wp--preset--color--vivid-red) !important;}.has-luminous-vivid-orange-background-color{background-color: var(--wp--preset--color--luminous-vivid-orange) !important;}.has-luminous-vivid-amber-background-color{background-color: var(--wp--preset--color--luminous-vivid-amber) !important;}.has-light-green-cyan-background-color{background-color: var(--wp--preset--color--light-green-cyan) !important;}.has-vivid-green-cyan-background-color{background-color: var(--wp--preset--color--vivid-green-cyan) !important;}.has-pale-cyan-blue-background-color{background-color: var(--wp--preset--color--pale-cyan-blue) !important;}.has-vivid-cyan-blue-background-color{background-color: var(--wp--preset--color--vivid-cyan-blue) !important;}.has-vivid-purple-background-color{background-color: var(--wp--preset--color--vivid-purple) !important;}.has-black-border-color{border-color: var(--wp--preset--color--black) !important;}.has-cyan-bluish-gray-border-color{border-color: var(--wp--preset--color--cyan-bluish-gray) !important;}.has-white-border-color{border-color: var(--wp--preset--color--white) !important;}.has-pale-pink-border-color{border-color: var(--wp--preset--color--pale-pink) !important;}.has-vivid-red-border-color{border-color: var(--wp--preset--color--vivid-red) !important;}.has-luminous-vivid-orange-border-color{border-color: var(--wp--preset--color--luminous-vivid-orange) !important;}.has-luminous-vivid-amber-border-color{border-color: var(--wp--preset--color--luminous-vivid-amber) !important;}.has-light-green-cyan-border-color{border-color: var(--wp--preset--color--light-green-cyan) !important;}.has-vivid-green-cyan-border-color{border-color: var(--wp--preset--color--vivid-green-cyan) !important;}.has-pale-cyan-blue-border-color{border-color: var(--wp--preset--color--pale-cyan-blue) !important;}.has-vivid-cyan-blue-border-color{border-color: var(--wp--preset--color--vivid-cyan-blue) !important;}.has-vivid-purple-border-color{border-color: var(--wp--preset--color--vivid-purple) !important;}.has-vivid-cyan-blue-to-vivid-purple-gradient-background{background: var(--wp--preset--gradient--vivid-cyan-blue-to-vivid-purple) !important;}.has-light-green-cyan-to-vivid-green-cyan-gradient-background{background: var(--wp--preset--gradient--light-green-cyan-to-vivid-green-cyan) !important;}.has-luminous-vivid-amber-to-luminous-vivid-orange-gradient-background{background: var(--wp--preset--gradient--luminous-vivid-amber-to-luminous-vivid-orange) !important;}.has-luminous-vivid-orange-to-vivid-red-gradient-background{background: var(--wp--preset--gradient--luminous-vivid-orange-to-vivid-red) !important;}.has-very-light-gray-to-cyan-bluish-gray-gradient-background{background: var(--wp--preset--gradient--very-light-gray-to-cyan-bluish-gray) !important;}.has-cool-to-warm-spectrum-gradient-background{background: var(--wp--preset--gradient--cool-to-warm-spectrum) !important;}.has-blush-light-purple-gradient-background{background: var(--wp--preset--gradient--blush-light-purple) !important;}.has-blush-bordeaux-gradient-background{background: var(--wp--preset--gradient--blush-bordeaux) !important;}.has-luminous-dusk-gradient-background{background: var(--wp--preset--gradient--luminous-dusk) !important;}.has-pale-ocean-gradient-background{background: var(--wp--preset--gradient--pale-ocean) !important;}.has-electric-grass-gradient-background{background: var(--wp--preset--gradient--electric-grass) !important;}.has-midnight-gradient-background{background: var(--wp--preset--gradient--midnight) !important;}.has-small-font-size{font-size: var(--wp--preset--font-size--small) !important;}.has-medium-font-size{font-size: var(--wp--preset--font-size--medium) !important;}.has-large-font-size{font-size: var(--wp--preset--font-size--large) !important;}.has-x-large-font-size{font-size: var(--wp--preset--font-size--x-large) !important;}
:root :where(.wp-block-icon svg){width: 24px;}
:root :where(.wp-block-pullquote){font-size: 1.5em;line-height: 1.6;}
/*# sourceURL=global-styles-inline-css */
`
      }} />
      <style id="woocommerce-inline-inline-css" dangerouslySetInnerHTML={{
        __html: `
.woocommerce form .form-row .required { visibility: visible; }
/*# sourceURL=woocommerce-inline-inline-css */
`
      }} />
      <style id="style-inline-organising-team-4" dangerouslySetInnerHTML={{
        __html: `.woocommerce-product-gallery{ opacity: 1 !important; }`
      }} />
      <style id="style-inline-organising-team-5" dangerouslySetInnerHTML={{
        __html: `
				.e-con.e-parent:nth-of-type(n+4):not(.e-lazyloaded):not(.e-no-lazyload),
				.e-con.e-parent:nth-of-type(n+4):not(.e-lazyloaded):not(.e-no-lazyload) * {
					background-image: none !important;
				}
				@media screen and (max-height: 1024px) {
					.e-con.e-parent:nth-of-type(n+3):not(.e-lazyloaded):not(.e-no-lazyload),
					.e-con.e-parent:nth-of-type(n+3):not(.e-lazyloaded):not(.e-no-lazyload) * {
						background-image: none !important;
					}
				}
				@media screen and (max-height: 640px) {
					.e-con.e-parent:nth-of-type(n+2):not(.e-lazyloaded):not(.e-no-lazyload),
					.e-con.e-parent:nth-of-type(n+2):not(.e-lazyloaded):not(.e-no-lazyload) * {
						background-image: none !important;
					}
				}
			`
      }} />
      <style id="wp-custom-css" dangerouslySetInnerHTML={{
        __html: `


/** Start Block Kit CSS: 144-3-3a7d335f39a8579c20cdf02f8d462582 **/

.envato-block__preview{overflow: visible;}

/* Envato Kit 141 Custom Styles - Applied to the element under Advanced */

.elementor-headline-animation-type-drop-in .elementor-headline-dynamic-wrapper{
	text-align: center;
}
.envato-kit-141-top-0 h1,
.envato-kit-141-top-0 h2,
.envato-kit-141-top-0 h3,
.envato-kit-141-top-0 h4,
.envato-kit-141-top-0 h5,
.envato-kit-141-top-0 h6,
.envato-kit-141-top-0 p {
	margin-top: 0;
}

.envato-kit-141-newsletter-inline .elementor-field-textual.elementor-size-md {
	padding-left: 1.5rem;
	padding-right: 1.5rem;
}

.envato-kit-141-bottom-0 p {
	margin-bottom: 0;
}

.envato-kit-141-bottom-8 .elementor-price-list .elementor-price-list-item .elementor-price-list-header {
	margin-bottom: .5rem;
}

.envato-kit-141.elementor-widget-testimonial-carousel.elementor-pagination-type-bullets .swiper-container {
	padding-bottom: 52px;
}

.envato-kit-141-display-inline {
	display: inline-block;
}

.envato-kit-141 .elementor-slick-slider ul.slick-dots {
	bottom: -40px;
}

/** End Block Kit CSS: 144-3-3a7d335f39a8579c20cdf02f8d462582 **/





.ant-select-selection-search-input {
    opacity: 1 !important;
    pointer-events: auto !important;
}






















































/* ===== APPLY ONLY ON CERTIFICATE PAGE ===== */
.certificate-page .eventin-certificate-wrapper {
    width: 1900px !important;
    height: auto !important;
    margin: 0 auto;
    position: relative;
    overflow: visible !important;
}

/* ===== IMAGE FULL RESOLUTION ===== */
.certificate-page .eventin-certificate img,
.certificate-page .elementor-widget-image img {
    width: 1900px !important;
    height: auto !important;
    max-width: none !important;
    display: block;
}

/* ===== FIX NAME POSITION ===== */
.certificate-page .eventin-certificate-wrapper .elementor-heading-title {
    position: absolute !important;
    top: 820px;
    left: 50%;
    transform: translateX(-50%);
    width: 80%;
    text-align: center;

    margin: 0 !important;
    padding: 0 !important;
    line-height: 1.2;
}

/* ===== REMOVE SPACE (ONLY INSIDE CERTIFICATE) ===== */
.certificate-page .eventin-certificate-wrapper .elementor-section,
.certificate-page .eventin-certificate-wrapper .elementor-container,
.certificate-page .eventin-certificate-wrapper .elementor-column {
    margin: 0 !important;
    padding: 0 !important;
}

/* ===== PDF FIX ===== */
@media print {
    .certificate-page .eventin-certificate-wrapper {
        width: 1900px !important;
        height: auto !important;
        overflow: visible !important;
        page-break-inside: avoid;
    }
}

/* ===== PREVENT BLUR ===== */
.certificate-page .eventin-certificate,
.certificate-page .eventin-certificate-wrapper {
    transform: none !important;
}














`
      }} />
      <style id="style-inline-organising-team-7" dangerouslySetInnerHTML={{
        __html: `
  /* Scoped CSS to prevent Elementor global style conflicts */
  :root {
    --ink: #210c12;
    --ink-light: #4a2a36;
    --leaf: #6E1A3D;
    --leaf-soft: #8C2452;
    --magenta: #C2185B;
    --gold: #C98A2A;
    --clay: #A9522F;
    --ivory: #FCF5F0;
    --ivory-deep: #F5E5DC;
    --line: rgba(110,26,61,.12);
  }
  
  .ayurvedam-team-page {
    background: var(--ivory);
    color: var(--ink);
    font-family: 'Outfit', sans-serif;
    -webkit-font-smoothing: antialiased;
    padding: 60px 0 100px;
    width: 100%;
  }
  
  .ayurvedam-team-page * { box-sizing: border-box; }
  .ayurvedam-team-page img { max-width: 100%; display: block; }
  
  .ayurvedam-team-page .wrap { 
    max-width: 1200px; 
    margin: 0 auto; 
    padding: 0 32px; 
  }
  
  .ayurvedam-team-page .section-head { 
    text-align: center; 
    max-width: 800px; 
    margin: 0 auto 56px; 
  }
  
  .ayurvedam-team-page .eyebrow {
    font-family: 'JetBrains Mono', monospace;
    font-size: 13px;
    letter-spacing: .16em;
    text-transform: uppercase;
    color: var(--gold);
    font-weight: 600;
    display: inline-block;
    margin-bottom: 12px;
  }
  
  .ayurvedam-team-page h2 { 
    font-family: 'Fraunces', serif; 
    font-size: clamp(32px, 4vw, 44px); 
    margin: 0 0 16px; 
    color: var(--ink);
    font-weight: 600;
    line-height: 1.2;
  }

  /* Core Organisers Grid */
  .ayurvedam-team-page .team-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
    gap: 24px;
    margin-bottom: 80px;
  }

  .ayurvedam-team-page .team-card {
    background: #fff;
    border: 1px solid var(--line);
    border-radius: 24px;
    padding: 40px 20px;
    text-align: center;
    box-shadow: 0 4px 12px rgba(110,26,61,.04);
    transition: transform 0.4s cubic-bezier(0.16, 1, 0.3, 1), box-shadow 0.4s ease;
    display: flex;
    flex-direction: column;
    align-items: center;
  }

  .ayurvedam-team-page .team-card:hover {
    transform: translateY(-8px);
    box-shadow: 0 20px 40px rgba(110,26,61,.12);
    border-color: rgba(201,138,42,0.3);
  }

  /* Premium Gold Ring Image Wrapper */
  .ayurvedam-team-page .img-wrapper {
    width: 150px;
    height: 150px;
    border-radius: 50%;
    margin: 0 auto 20px;
    padding: 4px;
    background: linear-gradient(135deg, var(--gold), var(--magenta));
    position: relative;
    overflow: hidden;
  }
  
  .ayurvedam-team-page .img-wrapper img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    object-position: top center;
    border-radius: 50%;
    border: 4px solid #fff;
    background: var(--ivory-deep);
    transition: transform 0.5s ease;
  }
  
  .ayurvedam-team-page .team-card:hover .img-wrapper img {
    transform: scale(1.08);
  }

  .ayurvedam-team-page h4 {
    font-family: 'Fraunces', serif;
    font-size: 20px;
    color: var(--leaf);
    margin: 0 0 6px;
    font-weight: 700;
    line-height: 1.2;
  }

  .ayurvedam-team-page .role {
    font-size: 13px;
    color: var(--clay);
    font-weight: 600;
    text-transform: uppercase;
    letter-spacing: 0.08em;
    margin-bottom: 16px;
  }

  .ayurvedam-team-page .phone {
    font-family: 'JetBrains Mono', monospace;
    font-size: 13px;
    color: var(--ink-light);
    font-weight: 500;
    background: var(--ivory);
    padding: 6px 14px;
    border-radius: 20px;
    display: inline-flex;
    align-items: center;
    gap: 6px;
  }

  /* Co-Organisers Grid (Dense Layout with Avatars) */
  .ayurvedam-team-page .co-org-grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
    gap: 16px;
  }

  .ayurvedam-team-page .co-org-card {
    display: flex;
    align-items: center;
    gap: 16px;
    padding: 16px 20px;
    background: #fff;
    border: 1px solid var(--line);
    border-radius: 16px;
    transition: all 0.3s ease;
    box-shadow: 0 4px 10px rgba(0,0,0,0.02);
  }

  .ayurvedam-team-page .co-org-card:hover {
    box-shadow: 0 12px 24px rgba(110,26,61,.08);
    border-color: rgba(201,138,42,0.4);
    transform: translateY(-3px);
  }

  .ayurvedam-team-page .co-org-avatar {
    width: 56px;
    height: 56px;
    border-radius: 50%;
    background: linear-gradient(135deg, var(--ivory-deep), #fff);
    border: 2px solid rgba(194,24,91,.15);
    display: flex;
    align-items: center;
    justify-content: center;
    font-family: 'Fraunces', serif;
    font-weight: 700;
    color: var(--magenta);
    font-size: 20px;
    flex-shrink: 0;
    overflow: hidden;
  }
  
  .ayurvedam-team-page .co-org-avatar img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    object-position: top center;
  }

  .ayurvedam-team-page .co-org-info {
    display: flex;
    flex-direction: column;
    gap: 4px;
  }

  .ayurvedam-team-page .co-org-name {
    font-weight: 600;
    font-size: 16px;
    color: var(--ink);
    line-height: 1.2;
    display: flex;
    align-items: center;
    gap: 6px;
  }

  .ayurvedam-team-page .co-org-phone {
    font-family: 'JetBrains Mono', monospace;
    font-size: 12.5px;
    color: var(--clay);
  }

  /* Responsive Design */
  @media (max-width: 1024px) {
    .ayurvedam-team-page .team-grid { grid-template-columns: repeat(3, 1fr); }
  }
  
  @media (max-width: 768px) {
    .ayurvedam-team-page .team-grid { grid-template-columns: repeat(2, 1fr); }
    .ayurvedam-team-page .co-org-grid { grid-template-columns: 1fr; }
  }

  @media (max-width: 480px) {
    .ayurvedam-team-page .team-grid { grid-template-columns: 1fr; }
    .ayurvedam-team-page .img-wrapper { width: 180px; height: 180px; }
  }
`
      }} />
      
      <div dangerouslySetInnerHTML={{
        __html: `<a class="skip-link screen-reader-text" href="#content">Skip to content</a>
<header class="elementor elementor-113 elementor-location-header" data-elementor-id="113" data-elementor-post-type="elementor_library" data-elementor-type="header">
<section class="elementor-section elementor-top-section elementor-element elementor-element-3040c7d5 elementor-section-content-middle elementor-hidden-mobile elementor-hidden-desktop elementor-hidden-tablet elementor-section-boxed elementor-section-height-default elementor-section-height-default" data-e-type="section" data-element_type="section" data-id="3040c7d5" data-settings='{"background_background":"gradient"}'>
<div class="elementor-background-overlay"></div>
<div class="elementor-container elementor-column-gap-no">
<div class="elementor-column elementor-col-50 elementor-top-column elementor-element elementor-element-10fafc90 elementor-hidden-mobile" data-e-type="column" data-element_type="column" data-id="10fafc90">
<div class="elementor-widget-wrap elementor-element-populated">
<div class="elementor-element elementor-element-5ba6f6eb elementor-view-stacked elementor-position-inline-start elementor-widget__width-auto elementor-shape-circle elementor-mobile-position-block-start elementor-widget elementor-widget-icon-box" data-e-type="widget" data-element_type="widget" data-id="5ba6f6eb" data-widget_type="icon-box.default">
<div class="elementor-widget-container">
<div class="elementor-icon-box-wrapper">
<div class="elementor-icon-box-icon">
<span class="elementor-icon">
<i aria-hidden="true" class="icon icon-phone1"></i> </span>
</div>
<div class="elementor-icon-box-content">
<h6 class="elementor-icon-box-title">
<span>
							PHONE NUMBER :						</span>
</h6>
<p class="elementor-icon-box-description">
						+91 8318714809					</p>
</div>
</div>
</div>
</div>
<div class="elementor-element elementor-element-1d555a60 elementor-view-stacked elementor-position-inline-start elementor-widget__width-auto elementor-shape-circle elementor-mobile-position-block-start elementor-widget elementor-widget-icon-box" data-e-type="widget" data-element_type="widget" data-id="1d555a60" data-widget_type="icon-box.default">
<div class="elementor-widget-container">
<div class="elementor-icon-box-wrapper">
<div class="elementor-icon-box-icon">
<span class="elementor-icon">
<i aria-hidden="true" class="icon icon-envelope11"></i> </span>
</div>
<div class="elementor-icon-box-content">
<h6 class="elementor-icon-box-title">
<span>
							EMAIL ADDRESS :						</span>
</h6>
<p class="elementor-icon-box-description">
						info@ayurvedamfoundation.org					</p>
</div>
</div>
</div>
</div>
</div>
</div>
<div class="elementor-column elementor-col-50 elementor-top-column elementor-element elementor-element-379c451a" data-e-type="column" data-element_type="column" data-id="379c451a">
<div class="elementor-widget-wrap elementor-element-populated">
<div class="elementor-element elementor-element-47d501db e-grid-align-right e-grid-align-mobile-left elementor-widget__width-auto elementor-shape-rounded elementor-grid-0 elementor-widget elementor-widget-social-icons" data-e-type="widget" data-element_type="widget" data-id="47d501db" data-widget_type="social-icons.default">
<div class="elementor-widget-container">
<div class="elementor-social-icons-wrapper elementor-grid" role="list">
<span class="elementor-grid-item" role="listitem">
<a class="elementor-icon elementor-social-icon elementor-social-icon-facebook elementor-repeater-item-0448771" href="https://www.facebook.com/ayurvedamfoundation" target="_blank">
<span class="elementor-screen-only">Facebook</span>
<svg aria-hidden="true" class="e-font-icon-svg e-fab-facebook" viewbox="0 0 512 512" xmlns="http://www.w3.org/2000/svg"><path d="M504 256C504 119 393 8 256 8S8 119 8 256c0 123.78 90.69 226.38 209.25 245V327.69h-63V256h63v-54.64c0-62.15 37-96.48 93.67-96.48 27.14 0 55.52 4.84 55.52 4.84v61h-31.28c-30.8 0-40.41 19.12-40.41 38.73V256h68.78l-11 71.69h-57.78V501C413.31 482.38 504 379.78 504 256z"></path></svg> </a>
</span>
<span class="elementor-grid-item" role="listitem">
<a class="elementor-icon elementor-social-icon elementor-social-icon-youtube elementor-repeater-item-adb5148" href="https://www.youtube.com/@AyurvedamFoundation" target="_blank">
<span class="elementor-screen-only">Youtube</span>
<svg aria-hidden="true" class="e-font-icon-svg e-fab-youtube" viewbox="0 0 576 512" xmlns="http://www.w3.org/2000/svg"><path d="M549.655 124.083c-6.281-23.65-24.787-42.276-48.284-48.597C458.781 64 288 64 288 64S117.22 64 74.629 75.486c-23.497 6.322-42.003 24.947-48.284 48.597-11.412 42.867-11.412 132.305-11.412 132.305s0 89.438 11.412 132.305c6.281 23.65 24.787 41.5 48.284 47.821C117.22 448 288 448 288 448s170.78 0 213.371-11.486c23.497-6.321 42.003-24.171 48.284-47.821 11.412-42.867 11.412-132.305 11.412-132.305s0-89.438-11.412-132.305zm-317.51 213.508V175.185l142.739 81.205-142.739 81.201z"></path></svg> </a>
</span>
<span class="elementor-grid-item" role="listitem">
<a class="elementor-icon elementor-social-icon elementor-social-icon-instagram elementor-repeater-item-2841575" href="https://www.instagram.com/AyurvedamFoundation" target="_blank">
<span class="elementor-screen-only">Instagram</span>
<svg aria-hidden="true" class="e-font-icon-svg e-fab-instagram" viewbox="0 0 448 512" xmlns="http://www.w3.org/2000/svg"><path d="M224.1 141c-63.6 0-114.9 51.3-114.9 114.9s51.3 114.9 114.9 114.9S339 319.5 339 255.9 287.7 141 224.1 141zm0 189.6c-41.1 0-74.7-33.5-74.7-74.7s33.5-74.7 74.7-74.7 74.7 33.5 74.7 74.7-33.6 74.7-74.7 74.7zm146.4-194.3c0 14.9-12 26.8-26.8 26.8-14.9 0-26.8-12-26.8-26.8s12-26.8 26.8-26.8 26.8 12 26.8 26.8zm76.1 27.2c-1.7-35.9-9.9-67.7-36.2-93.9-26.2-26.2-58-34.4-93.9-36.2-37-2.1-147.9-2.1-184.9 0-35.8 1.7-67.6 9.9-93.9 36.1s-34.4 58-36.2 93.9c-2.1 37-2.1 147.9 0 184.9 1.7 35.9 9.9 67.7 36.2 93.9s58 34.4 93.9 36.2c37 2.1 147.9 2.1 184.9 0 35.9-1.7 67.7-9.9 93.9-36.2 26.2-26.2 34.4-58 36.2-93.9 2.1-37 2.1-147.8 0-184.8zM398.8 388c-7.8 19.6-22.9 34.7-42.6 42.6-29.5 11.7-99.5 9-132.1 9s-102.7 2.6-132.1-9c-19.6-7.8-34.7-22.9-42.6-42.6-11.7-29.5-9-99.5-9-132.1s-2.6-102.7 9-132.1c7.8-19.6 22.9-34.7 42.6-42.6 29.5-11.7 99.5-9 132.1-9s102.7-2.6 132.1 9c19.6 7.8 34.7 22.9 42.6 42.6 11.7 29.5 9 99.5 9 132.1s2.7 102.7-9 132.1z"></path></svg> </a>
</span>
<span class="elementor-grid-item" role="listitem">
<a class="elementor-icon elementor-social-icon elementor-social-icon-linkedin elementor-repeater-item-5545b7f" href="http://www.linkedin.com/AyurvedamFoundation" target="_blank">
<span class="elementor-screen-only">Linkedin</span>
<svg aria-hidden="true" class="e-font-icon-svg e-fab-linkedin" viewbox="0 0 448 512" xmlns="http://www.w3.org/2000/svg"><path d="M416 32H31.9C14.3 32 0 46.5 0 64.3v383.4C0 465.5 14.3 480 31.9 480H416c17.6 0 32-14.5 32-32.3V64.3c0-17.8-14.4-32.3-32-32.3zM135.4 416H69V202.2h66.5V416zm-33.2-243c-21.3 0-38.5-17.3-38.5-38.5S80.9 96 102.2 96c21.2 0 38.5 17.3 38.5 38.5 0 21.3-17.2 38.5-38.5 38.5zm282.1 243h-66.4V312c0-24.8-.5-56.7-34.5-56.7-34.6 0-39.9 27-39.9 54.9V416h-66.4V202.2h63.7v29.2h.9c8.9-16.8 30.6-34.5 62.9-34.5 67.2 0 79.7 44.3 79.7 101.9V416z"></path></svg> </a>
</span>
</div>
</div>
</div>
</div>
</div>
</div>
</section>
<section class="elementor-section elementor-top-section elementor-element elementor-element-29abb3aa elementor-section-content-middle elementor-section-full_width elementor-section-stretched elementor-hidden-mobile elementor-section-height-default elementor-section-height-default" data-e-type="section" data-element_type="section" data-id="29abb3aa" data-settings='{"background_background":"classic","stretch_section":"section-stretched","sticky":"top","sticky_on":["desktop","tablet","mobile"],"sticky_offset":0,"sticky_effects_offset":0,"sticky_anchor_link_offset":0}'>
<div class="elementor-background-overlay"></div>
<div class="elementor-container elementor-column-gap-no">
<div class="elementor-column elementor-col-33 elementor-top-column elementor-element elementor-element-577dd94d" data-e-type="column" data-element_type="column" data-id="577dd94d">
<div class="elementor-widget-wrap elementor-element-populated">
<div class="elementor-element elementor-element-51fd9c4 elementor-widget elementor-widget-image" data-e-type="widget" data-element_type="widget" data-id="51fd9c4" data-widget_type="image.default">
<div class="elementor-widget-container">
<img alt="" class="attachment-large size-large wp-image-118" fetchpriority="high" height="875" sizes="(max-width: 586px) 100vw, 586px" src="/uploads/2025/03/Untitled-design-6-e1742823184130.png" srcset="/uploads/2025/03/Untitled-design-6-e1742823184130.png 586w, /uploads/2025/03/Untitled-design-6-e1742823184130-201x300.png 201w" width="586"/> </div>
</div>
</div>
</div>
<div class="elementor-column elementor-col-33 elementor-top-column elementor-element elementor-element-d79a3df" data-e-type="column" data-element_type="column" data-id="d79a3df" data-settings='{"background_background":"classic"}'>
<div class="elementor-widget-wrap elementor-element-populated">
<div class="elementor-background-overlay"></div>
<div class="elementor-element elementor-element-7c7bfefa elementor-nav-menu__align-center elementor-nav-menu--stretch elementor-nav-menu__text-align-center elementor-nav-menu--dropdown-tablet elementor-nav-menu--toggle elementor-nav-menu--burger elementor-widget elementor-widget-nav-menu" data-e-type="widget" data-element_type="widget" data-id="7c7bfefa" data-settings='{"full_width":"stretch","layout":"horizontal","submenu_icon":{"value":"&lt;svg aria-hidden=\"true\" class=\"e-font-icon-svg e-fas-caret-down\" viewBox=\"0 0 320 512\" xmlns=\"http:\/\/www.w3.org\/2000\/svg\"&gt;&lt;path d=\"M31.3 192h257.3c17.8 0 26.7 21.5 14.1 34.1L174.1 354.8c-7.8 7.8-20.5 7.8-28.3 0L17.2 226.1C4.6 213.5 13.5 192 31.3 192z\"&gt;&lt;\/path&gt;&lt;\/svg&gt;","library":"fa-solid"},"toggle":"burger"}' data-widget_type="nav-menu.default">
<div class="elementor-widget-container">
<nav aria-label="Menu" class="elementor-nav-menu--main elementor-nav-menu__container elementor-nav-menu--layout-horizontal e--pointer-none">
<ul class="elementor-nav-menu" id="menu-1-7c7bfefa"><li class="menu-item menu-item-type-post_type menu-item-object-page menu-item-home menu-item-96"><a class="elementor-item" href="../">HOME</a></li>
<li class="menu-item menu-item-type-custom menu-item-object-custom current-menu-ancestor current-menu-parent menu-item-has-children menu-item-97"><a class="elementor-item elementor-item-anchor" href="#">ABOUT US</a>
<ul class="sub-menu elementor-nav-menu--dropdown">
<li class="menu-item menu-item-type-post_type menu-item-object-page menu-item-99"><a class="elementor-sub-item" href="/about-us">ABOUT AYURVEDAM FOUNDATION</a></li>
<li class="menu-item menu-item-type-post_type menu-item-object-page current-menu-item page_item page-item-125 current_page_item menu-item-157"><a aria-current="page" class="elementor-sub-item elementor-item-active" href="/organising-team">CORE ORGANIZERS</a></li>
<li class="menu-item menu-item-type-post_type menu-item-object-page menu-item-160"><a class="elementor-sub-item" href="/our-state-ambassadors">STATE AMBASSADORS</a></li>
<li class="menu-item menu-item-type-post_type menu-item-object-page menu-item-159"><a class="elementor-sub-item" href="/associating-partners">SOCIAL MEDIA PARTNERS</a></li>
</ul>
</li>
<li class="menu-item menu-item-type-custom menu-item-object-custom menu-item-has-children menu-item-147"><a class="elementor-item elementor-item-anchor" href="#">OUR EVENTS</a>
<ul class="sub-menu elementor-nav-menu--dropdown">
<li class="menu-item menu-item-type-custom menu-item-object-custom menu-item-has-children menu-item-494"><a class="elementor-sub-item elementor-item-anchor" href="#">AYURMAHOTSAVA 2024</a>
<ul class="sub-menu elementor-nav-menu--dropdown">
<li class="menu-item menu-item-type-post_type menu-item-object-page menu-item-154"><a class="elementor-sub-item" href="/about-ayurmahotsava">ABOUT AYURMAHOTSAVA 2024</a></li>
<li class="menu-item menu-item-type-custom menu-item-object-custom menu-item-351"><a class="elementor-sub-item" href="/uploads/2025/03/AyurMahotsav@Jaipur-2k24-✨.pdf">BROCHURE OF AYURMAHOTSAVA</a></li>
<li class="menu-item menu-item-type-post_type menu-item-object-page menu-item-156"><a class="elementor-sub-item" href="/glimpse-of-ayurmahotsava">GLIMPSE OF AYURMAHOTSAVA</a></li>
</ul>
</li>
<li class="menu-item menu-item-type-custom menu-item-object-custom menu-item-has-children menu-item-15076"><a class="elementor-sub-item elementor-item-anchor" href="#">AYURVED ANANTAM 2025</a>
<ul class="sub-menu elementor-nav-menu--dropdown">
<li class="menu-item menu-item-type-post_type menu-item-object-page menu-item-1897"><a class="elementor-sub-item" href="/about-ayurved-anantam-2025">ABOUT AYURVED ANANTAM 2025</a></li>
<li class="menu-item menu-item-type-custom menu-item-object-custom menu-item-1891"><a class="elementor-sub-item" href="/uploads/2025/04/Ayurved-Anatam-2025-✨.pdf">BROCHURE OF AYURVED ANANTAM 2025</a></li>
<li class="menu-item menu-item-type-custom menu-item-object-custom menu-item-11392"><a class="elementor-sub-item" href="https://drive.google.com/file/d/1wFFSu0nreCnSo8taHv0pBbCCdVOeyhRh/view?usp=sharing">Glimpse Ayurveda Anantam</a></li>
</ul>
</li>
<li class="menu-item menu-item-type-custom menu-item-object-custom menu-item-has-children menu-item-11230"><a class="elementor-sub-item elementor-item-anchor" href="#">AYURVED APARAJITA 2026</a>
<ul class="sub-menu elementor-nav-menu--dropdown">
<li class="menu-item menu-item-type-post_type menu-item-object-page menu-item-11231"><a class="elementor-sub-item" href="/about-ayurved-aparajita-2026">ABOUT AYURVED APARAJITA 2026</a></li>
<li class="menu-item menu-item-type-custom menu-item-object-custom menu-item-11233"><a class="elementor-sub-item" href="https://drive.google.com/file/d/1qvl9weDaBX-FO7ZiQopKg2sz2yE3o3LW/view?usp=drivesdk">BROCHURE OF AYURVED APARAJITA 2026</a></li>
<li class="menu-item menu-item-type-post_type menu-item-object-page menu-item-14332"><a class="elementor-sub-item" href="/glimpse-of-ayurmahotsava">GLIMPSE OF AYURVED APARAJITA 2026</a></li>
</ul>
</li>
<li class="menu-item menu-item-type-post_type menu-item-object-page menu-item-14535"><a class="elementor-sub-item" href="/ayurved-yashobhoomi-2026">Ayurved Yashobhoomi 2026</a></li>
</ul>
</li>
<li class="menu-item menu-item-type-post_type menu-item-object-page menu-item-has-children menu-item-14508"><a class="elementor-item" href="/ayurved-yashobhoomi-2026">Ayurved Yashobhoomi 2026</a>
<ul class="sub-menu elementor-nav-menu--dropdown">
<li class="menu-item menu-item-type-post_type menu-item-object-page menu-item-14536"><a class="elementor-sub-item" href="/ayurved-yashobhoomi-2026">ABOUT AYURVED YASHOBHOOMI 2026</a></li>
<li class="menu-item menu-item-type-custom menu-item-object-custom menu-item-14538"><a class="elementor-sub-item" href="https://drive.google.com/file/d/1_fpg23X7LBXLPbUZ6gUiXWuCmwHleJqk/view">BROCHURE OF AYURVED YASHOBHOOMI 2026</a></li>
<li class="menu-item menu-item-type-custom menu-item-object-custom menu-item-11232"><a class="elementor-sub-item elementor-item-anchor" href="/ayurved-yashobhoomi-2026/#ayv-register">REGISTRATION FOR AYURVED YASHOBHOOMI 2026</a></li>
<li class="menu-item menu-item-type-custom menu-item-object-custom menu-item-14652"><a class="elementor-sub-item" href="https://u.payu.in/PAYUMN/qJM9c6eM5XLP">BOOK ACCOMMODATION</a></li>
</ul>
</li>
<li class="menu-item menu-item-type-custom menu-item-object-custom menu-item-has-children menu-item-14873"><a class="elementor-item elementor-item-anchor" href="#">Exhibitor</a>
<ul class="sub-menu elementor-nav-menu--dropdown">
<li class="menu-item menu-item-type-post_type menu-item-object-page menu-item-14326"><a class="elementor-sub-item" href="/exhibitor-from">Exhibitor Interest Form</a></li>
<li class="menu-item menu-item-type-post_type menu-item-object-page menu-item-14329"><a class="elementor-sub-item" href="/exhibitors">Exhibitor Profile</a></li>
<li class="menu-item menu-item-type-post_type menu-item-object-page menu-item-14328"><a class="elementor-sub-item" href="/why-exhibit-with-us">Why Exhibit With Us</a></li>
</ul>
</li>
<li class="menu-item menu-item-type-post_type menu-item-object-page menu-item-14325"><a class="elementor-item" href="/call-for-paper">CALL FOR ABSTRACTS</a></li>
<li class="menu-item menu-item-type-custom menu-item-object-custom menu-item-has-children menu-item-105"><a class="elementor-item elementor-item-anchor" href="#">GALLERY</a>
<ul class="sub-menu elementor-nav-menu--dropdown">
<li class="menu-item menu-item-type-post_type menu-item-object-page menu-item-106"><a class="elementor-sub-item" href="/images/">IMAGES</a></li>
<li class="menu-item menu-item-type-post_type menu-item-object-page menu-item-107"><a class="elementor-sub-item" href="/videos/">VIDEOS</a></li>
</ul>
</li>
<li class="menu-item menu-item-type-post_type menu-item-object-page menu-item-112"><a class="elementor-item" href="/contact-us">CONTACT US</a></li>
</ul> </nav>
<div aria-expanded="false" aria-label="Menu Toggle" class="elementor-menu-toggle" role="button" tabindex="0">
<svg aria-hidden="true" class="elementor-menu-toggle__icon--open e-font-icon-svg e-eicon-menu-bar" role="presentation" viewbox="0 0 1000 1000" xmlns="http://www.w3.org/2000/svg"><path d="M104 333H896C929 333 958 304 958 271S929 208 896 208H104C71 208 42 237 42 271S71 333 104 333ZM104 583H896C929 583 958 554 958 521S929 458 896 458H104C71 458 42 487 42 521S71 583 104 583ZM104 833H896C929 833 958 804 958 771S929 708 896 708H104C71 708 42 737 42 771S71 833 104 833Z"></path></svg><svg aria-hidden="true" class="elementor-menu-toggle__icon--close e-font-icon-svg e-eicon-close" role="presentation" viewbox="0 0 1000 1000" xmlns="http://www.w3.org/2000/svg"><path d="M742 167L500 408 258 167C246 154 233 150 217 150 196 150 179 158 167 167 154 179 150 196 150 212 150 229 154 242 171 254L408 500 167 742C138 771 138 800 167 829 196 858 225 858 254 829L496 587 738 829C750 842 767 846 783 846 800 846 817 842 829 829 842 817 846 804 846 783 846 767 842 750 829 737L588 500 833 258C863 229 863 200 833 171 804 137 775 137 742 167Z"></path></svg> </div>
<nav aria-hidden="true" class="elementor-nav-menu--dropdown elementor-nav-menu__container">
<ul class="elementor-nav-menu" id="menu-2-7c7bfefa"><li class="menu-item menu-item-type-post_type menu-item-object-page menu-item-home menu-item-96"><a class="elementor-item" href="../" tabindex="-1">HOME</a></li>
<li class="menu-item menu-item-type-custom menu-item-object-custom current-menu-ancestor current-menu-parent menu-item-has-children menu-item-97"><a class="elementor-item elementor-item-anchor" href="#" tabindex="-1">ABOUT US</a>
<ul class="sub-menu elementor-nav-menu--dropdown">
<li class="menu-item menu-item-type-post_type menu-item-object-page menu-item-99"><a class="elementor-sub-item" href="/about-us" tabindex="-1">ABOUT AYURVEDAM FOUNDATION</a></li>
<li class="menu-item menu-item-type-post_type menu-item-object-page current-menu-item page_item page-item-125 current_page_item menu-item-157"><a aria-current="page" class="elementor-sub-item elementor-item-active" href="/organising-team" tabindex="-1">CORE ORGANIZERS</a></li>
<li class="menu-item menu-item-type-post_type menu-item-object-page menu-item-160"><a class="elementor-sub-item" href="/our-state-ambassadors" tabindex="-1">STATE AMBASSADORS</a></li>
<li class="menu-item menu-item-type-post_type menu-item-object-page menu-item-159"><a class="elementor-sub-item" href="/associating-partners" tabindex="-1">SOCIAL MEDIA PARTNERS</a></li>
</ul>
</li>
<li class="menu-item menu-item-type-custom menu-item-object-custom menu-item-has-children menu-item-147"><a class="elementor-item elementor-item-anchor" href="#" tabindex="-1">OUR EVENTS</a>
<ul class="sub-menu elementor-nav-menu--dropdown">
<li class="menu-item menu-item-type-custom menu-item-object-custom menu-item-has-children menu-item-494"><a class="elementor-sub-item elementor-item-anchor" href="#" tabindex="-1">AYURMAHOTSAVA 2024</a>
<ul class="sub-menu elementor-nav-menu--dropdown">
<li class="menu-item menu-item-type-post_type menu-item-object-page menu-item-154"><a class="elementor-sub-item" href="/about-ayurmahotsava" tabindex="-1">ABOUT AYURMAHOTSAVA 2024</a></li>
<li class="menu-item menu-item-type-custom menu-item-object-custom menu-item-351"><a class="elementor-sub-item" href="/uploads/2025/03/AyurMahotsav@Jaipur-2k24-✨.pdf" tabindex="-1">BROCHURE OF AYURMAHOTSAVA</a></li>
<li class="menu-item menu-item-type-post_type menu-item-object-page menu-item-156"><a class="elementor-sub-item" href="/glimpse-of-ayurmahotsava" tabindex="-1">GLIMPSE OF AYURMAHOTSAVA</a></li>
</ul>
</li>
<li class="menu-item menu-item-type-custom menu-item-object-custom menu-item-has-children menu-item-15076"><a class="elementor-sub-item elementor-item-anchor" href="#" tabindex="-1">AYURVED ANANTAM 2025</a>
<ul class="sub-menu elementor-nav-menu--dropdown">
<li class="menu-item menu-item-type-post_type menu-item-object-page menu-item-1897"><a class="elementor-sub-item" href="/about-ayurved-anantam-2025" tabindex="-1">ABOUT AYURVED ANANTAM 2025</a></li>
<li class="menu-item menu-item-type-custom menu-item-object-custom menu-item-1891"><a class="elementor-sub-item" href="/uploads/2025/04/Ayurved-Anatam-2025-✨.pdf" tabindex="-1">BROCHURE OF AYURVED ANANTAM 2025</a></li>
<li class="menu-item menu-item-type-custom menu-item-object-custom menu-item-11392"><a class="elementor-sub-item" href="https://drive.google.com/file/d/1wFFSu0nreCnSo8taHv0pBbCCdVOeyhRh/view?usp=sharing" tabindex="-1">Glimpse Ayurveda Anantam</a></li>
</ul>
</li>
<li class="menu-item menu-item-type-custom menu-item-object-custom menu-item-has-children menu-item-11230"><a class="elementor-sub-item elementor-item-anchor" href="#" tabindex="-1">AYURVED APARAJITA 2026</a>
<ul class="sub-menu elementor-nav-menu--dropdown">
<li class="menu-item menu-item-type-post_type menu-item-object-page menu-item-11231"><a class="elementor-sub-item" href="/about-ayurved-aparajita-2026" tabindex="-1">ABOUT AYURVED APARAJITA 2026</a></li>
<li class="menu-item menu-item-type-custom menu-item-object-custom menu-item-11233"><a class="elementor-sub-item" href="https://drive.google.com/file/d/1qvl9weDaBX-FO7ZiQopKg2sz2yE3o3LW/view?usp=drivesdk" tabindex="-1">BROCHURE OF AYURVED APARAJITA 2026</a></li>
<li class="menu-item menu-item-type-post_type menu-item-object-page menu-item-14332"><a class="elementor-sub-item" href="/glimpse-of-ayurmahotsava" tabindex="-1">GLIMPSE OF AYURVED APARAJITA 2026</a></li>
</ul>
</li>
<li class="menu-item menu-item-type-post_type menu-item-object-page menu-item-14535"><a class="elementor-sub-item" href="/ayurved-yashobhoomi-2026" tabindex="-1">Ayurved Yashobhoomi 2026</a></li>
</ul>
</li>
<li class="menu-item menu-item-type-post_type menu-item-object-page menu-item-has-children menu-item-14508"><a class="elementor-item" href="/ayurved-yashobhoomi-2026" tabindex="-1">Ayurved Yashobhoomi 2026</a>
<ul class="sub-menu elementor-nav-menu--dropdown">
<li class="menu-item menu-item-type-post_type menu-item-object-page menu-item-14536"><a class="elementor-sub-item" href="/ayurved-yashobhoomi-2026" tabindex="-1">ABOUT AYURVED YASHOBHOOMI 2026</a></li>
<li class="menu-item menu-item-type-custom menu-item-object-custom menu-item-14538"><a class="elementor-sub-item" href="https://drive.google.com/file/d/1_fpg23X7LBXLPbUZ6gUiXWuCmwHleJqk/view" tabindex="-1">BROCHURE OF AYURVED YASHOBHOOMI 2026</a></li>
<li class="menu-item menu-item-type-custom menu-item-object-custom menu-item-11232"><a class="elementor-sub-item elementor-item-anchor" href="/ayurved-yashobhoomi-2026/#ayv-register" tabindex="-1">REGISTRATION FOR AYURVED YASHOBHOOMI 2026</a></li>
<li class="menu-item menu-item-type-custom menu-item-object-custom menu-item-14652"><a class="elementor-sub-item" href="https://u.payu.in/PAYUMN/qJM9c6eM5XLP" tabindex="-1">BOOK ACCOMMODATION</a></li>
</ul>
</li>
<li class="menu-item menu-item-type-custom menu-item-object-custom menu-item-has-children menu-item-14873"><a class="elementor-item elementor-item-anchor" href="#" tabindex="-1">Exhibitor</a>
<ul class="sub-menu elementor-nav-menu--dropdown">
<li class="menu-item menu-item-type-post_type menu-item-object-page menu-item-14326"><a class="elementor-sub-item" href="/exhibitor-from" tabindex="-1">Exhibitor Interest Form</a></li>
<li class="menu-item menu-item-type-post_type menu-item-object-page menu-item-14329"><a class="elementor-sub-item" href="/exhibitors" tabindex="-1">Exhibitor Profile</a></li>
<li class="menu-item menu-item-type-post_type menu-item-object-page menu-item-14328"><a class="elementor-sub-item" href="/why-exhibit-with-us" tabindex="-1">Why Exhibit With Us</a></li>
</ul>
</li>
<li class="menu-item menu-item-type-post_type menu-item-object-page menu-item-14325"><a class="elementor-item" href="/call-for-paper" tabindex="-1">CALL FOR ABSTRACTS</a></li>
<li class="menu-item menu-item-type-custom menu-item-object-custom menu-item-has-children menu-item-105"><a class="elementor-item elementor-item-anchor" href="#" tabindex="-1">GALLERY</a>
<ul class="sub-menu elementor-nav-menu--dropdown">
<li class="menu-item menu-item-type-post_type menu-item-object-page menu-item-106"><a class="elementor-sub-item" href="/images/" tabindex="-1">IMAGES</a></li>
<li class="menu-item menu-item-type-post_type menu-item-object-page menu-item-107"><a class="elementor-sub-item" href="/videos/" tabindex="-1">VIDEOS</a></li>
</ul>
</li>
<li class="menu-item menu-item-type-post_type menu-item-object-page menu-item-112"><a class="elementor-item" href="/contact-us" tabindex="-1">CONTACT US</a></li>
</ul> </nav>
</div>
</div>
</div>
</div>
<div class="elementor-column elementor-col-33 elementor-top-column elementor-element elementor-element-723752a5" data-e-type="column" data-element_type="column" data-id="723752a5">
<div class="elementor-widget-wrap elementor-element-populated">
<div class="elementor-element elementor-element-68c93c94 elementor-align-left elementor-tablet-align-justify elementor-mobile-align-right elementor-widget elementor-widget-button" data-e-type="widget" data-element_type="widget" data-id="68c93c94" data-widget_type="button.default">
<div class="elementor-widget-container">
<div class="elementor-button-wrapper">
<a class="elementor-button elementor-button-link elementor-size-sm" href="/ayurved-yashobhoomi-2026/#ayv-register">
<span class="elementor-button-content-wrapper">
<span class="elementor-button-text">REGISTRATION </span>
</span>
</a>
</div>
</div>
</div>
</div>
</div>
</div>
</section>
<section class="elementor-section elementor-top-section elementor-element elementor-element-cec1459 elementor-hidden-desktop elementor-hidden-tablet elementor-hidden-mobile elementor-section-boxed elementor-section-height-default elementor-section-height-default" data-e-type="section" data-element_type="section" data-id="cec1459" data-settings='{"background_background":"classic"}'>
<div class="elementor-container elementor-column-gap-default">
<div class="elementor-column elementor-col-50 elementor-top-column elementor-element elementor-element-c5ce8ab" data-e-type="column" data-element_type="column" data-id="c5ce8ab">
<div class="elementor-widget-wrap elementor-element-populated">
<div class="elementor-element elementor-element-3aae236 elementor-icon-list--layout-traditional elementor-list-item-link-full_width elementor-widget elementor-widget-icon-list" data-e-type="widget" data-element_type="widget" data-id="3aae236" data-widget_type="icon-list.default">
<div class="elementor-widget-container">
<ul class="elementor-icon-list-items">
<li class="elementor-icon-list-item">
<span class="elementor-icon-list-icon">
<i aria-hidden="true" class="icon icon-email"></i> </span>
<span class="elementor-icon-list-text">info@ayurvedamfoundation.org</span>
</li>
<li class="elementor-icon-list-item">
<span class="elementor-icon-list-icon">
<i aria-hidden="true" class="icon icon-phone-call"></i> </span>
<span class="elementor-icon-list-text">+91 8318714809</span>
</li>
</ul>
</div>
</div>
</div>
</div>
<div class="elementor-column elementor-col-50 elementor-top-column elementor-element elementor-element-7abb484" data-e-type="column" data-element_type="column" data-id="7abb484">
<div class="elementor-widget-wrap elementor-element-populated">
<div class="elementor-element elementor-element-d37b005 elementor-align-left elementor-tablet-align-justify elementor-mobile-align-right elementor-widget elementor-widget-button" data-e-type="widget" data-element_type="widget" data-id="d37b005" data-widget_type="button.default">
<div class="elementor-widget-container">
<div class="elementor-button-wrapper">
<a class="elementor-button elementor-button-link elementor-size-sm" href="/contact-us">
<span class="elementor-button-content-wrapper">
<span class="elementor-button-text">registration</span>
</span>
</a>
</div>
</div>
</div>
</div>
</div>
</div>
</section>
<section class="elementor-section elementor-top-section elementor-element elementor-element-cfda5dd elementor-hidden-desktop elementor-hidden-tablet elementor-section-boxed elementor-section-height-default elementor-section-height-default" data-e-type="section" data-element_type="section" data-id="cfda5dd">
<div class="elementor-container elementor-column-gap-default">
<div class="elementor-column elementor-col-33 elementor-top-column elementor-element elementor-element-7c27b5a" data-e-type="column" data-element_type="column" data-id="7c27b5a">
<div class="elementor-widget-wrap elementor-element-populated">
<div class="elementor-element elementor-element-e49e989 elementor-widget elementor-widget-image" data-e-type="widget" data-element_type="widget" data-id="e49e989" data-widget_type="image.default">
<div class="elementor-widget-container">
<a href="../">
<img alt="" class="attachment-full size-full wp-image-118" height="875" sizes="(max-width: 586px) 100vw, 586px" src="/uploads/2025/03/Untitled-design-6-e1742823184130.png" srcset="/uploads/2025/03/Untitled-design-6-e1742823184130.png 586w, /uploads/2025/03/Untitled-design-6-e1742823184130-201x300.png 201w" width="586"/> </a>
</div>
</div>
</div>
</div>
<div class="elementor-column elementor-col-33 elementor-top-column elementor-element elementor-element-c07bb39" data-e-type="column" data-element_type="column" data-id="c07bb39">
<div class="elementor-widget-wrap elementor-element-populated">
<div class="elementor-element elementor-element-651e496 elementor-widget elementor-widget-heading" data-e-type="widget" data-element_type="widget" data-id="651e496" data-widget_type="heading.default">
<div class="elementor-widget-container">
<h2 class="elementor-heading-title elementor-size-default">ayurvedam foundation</h2> </div>
</div>
<div class="elementor-element elementor-element-b8320eb elementor-widget elementor-widget-text-editor" data-e-type="widget" data-element_type="widget" data-id="b8320eb" data-widget_type="text-editor.default">
<div class="elementor-widget-container">
<p>A Unit of Indudevi Charitable Foundation</p> </div>
</div>
</div>
</div>
<div class="elementor-column elementor-col-33 elementor-top-column elementor-element elementor-element-71e2620" data-e-type="column" data-element_type="column" data-id="71e2620">
<div class="elementor-widget-wrap elementor-element-populated">
<div class="elementor-element elementor-element-7e44fb0 elementor-nav-menu--stretch elementor-nav-menu--dropdown-tablet elementor-nav-menu__text-align-aside elementor-nav-menu--toggle elementor-nav-menu--burger elementor-widget elementor-widget-nav-menu" data-e-type="widget" data-element_type="widget" data-id="7e44fb0" data-settings='{"full_width":"stretch","layout":"horizontal","submenu_icon":{"value":"&lt;svg aria-hidden=\"true\" class=\"e-font-icon-svg e-fas-caret-down\" viewBox=\"0 0 320 512\" xmlns=\"http:\/\/www.w3.org\/2000\/svg\"&gt;&lt;path d=\"M31.3 192h257.3c17.8 0 26.7 21.5 14.1 34.1L174.1 354.8c-7.8 7.8-20.5 7.8-28.3 0L17.2 226.1C4.6 213.5 13.5 192 31.3 192z\"&gt;&lt;\/path&gt;&lt;\/svg&gt;","library":"fa-solid"},"toggle":"burger"}' data-widget_type="nav-menu.default">
<div class="elementor-widget-container">
<nav aria-label="Menu" class="elementor-nav-menu--main elementor-nav-menu__container elementor-nav-menu--layout-horizontal e--pointer-underline e--animation-fade">
<ul class="elementor-nav-menu" id="menu-1-7e44fb0"><li class="menu-item menu-item-type-post_type menu-item-object-page menu-item-home menu-item-96"><a class="elementor-item" href="../">HOME</a></li>
<li class="menu-item menu-item-type-custom menu-item-object-custom current-menu-ancestor current-menu-parent menu-item-has-children menu-item-97"><a class="elementor-item elementor-item-anchor" href="#">ABOUT US</a>
<ul class="sub-menu elementor-nav-menu--dropdown">
<li class="menu-item menu-item-type-post_type menu-item-object-page menu-item-99"><a class="elementor-sub-item" href="/about-us">ABOUT AYURVEDAM FOUNDATION</a></li>
<li class="menu-item menu-item-type-post_type menu-item-object-page current-menu-item page_item page-item-125 current_page_item menu-item-157"><a aria-current="page" class="elementor-sub-item elementor-item-active" href="/organising-team">CORE ORGANIZERS</a></li>
<li class="menu-item menu-item-type-post_type menu-item-object-page menu-item-160"><a class="elementor-sub-item" href="/our-state-ambassadors">STATE AMBASSADORS</a></li>
<li class="menu-item menu-item-type-post_type menu-item-object-page menu-item-159"><a class="elementor-sub-item" href="/associating-partners">SOCIAL MEDIA PARTNERS</a></li>
</ul>
</li>
<li class="menu-item menu-item-type-custom menu-item-object-custom menu-item-has-children menu-item-147"><a class="elementor-item elementor-item-anchor" href="#">OUR EVENTS</a>
<ul class="sub-menu elementor-nav-menu--dropdown">
<li class="menu-item menu-item-type-custom menu-item-object-custom menu-item-has-children menu-item-494"><a class="elementor-sub-item elementor-item-anchor" href="#">AYURMAHOTSAVA 2024</a>
<ul class="sub-menu elementor-nav-menu--dropdown">
<li class="menu-item menu-item-type-post_type menu-item-object-page menu-item-154"><a class="elementor-sub-item" href="/about-ayurmahotsava">ABOUT AYURMAHOTSAVA 2024</a></li>
<li class="menu-item menu-item-type-custom menu-item-object-custom menu-item-351"><a class="elementor-sub-item" href="/uploads/2025/03/AyurMahotsav@Jaipur-2k24-✨.pdf">BROCHURE OF AYURMAHOTSAVA</a></li>
<li class="menu-item menu-item-type-post_type menu-item-object-page menu-item-156"><a class="elementor-sub-item" href="/glimpse-of-ayurmahotsava">GLIMPSE OF AYURMAHOTSAVA</a></li>
</ul>
</li>
<li class="menu-item menu-item-type-custom menu-item-object-custom menu-item-has-children menu-item-15076"><a class="elementor-sub-item elementor-item-anchor" href="#">AYURVED ANANTAM 2025</a>
<ul class="sub-menu elementor-nav-menu--dropdown">
<li class="menu-item menu-item-type-post_type menu-item-object-page menu-item-1897"><a class="elementor-sub-item" href="/about-ayurved-anantam-2025">ABOUT AYURVED ANANTAM 2025</a></li>
<li class="menu-item menu-item-type-custom menu-item-object-custom menu-item-1891"><a class="elementor-sub-item" href="/uploads/2025/04/Ayurved-Anatam-2025-✨.pdf">BROCHURE OF AYURVED ANANTAM 2025</a></li>
<li class="menu-item menu-item-type-custom menu-item-object-custom menu-item-11392"><a class="elementor-sub-item" href="https://drive.google.com/file/d/1wFFSu0nreCnSo8taHv0pBbCCdVOeyhRh/view?usp=sharing">Glimpse Ayurveda Anantam</a></li>
</ul>
</li>
<li class="menu-item menu-item-type-custom menu-item-object-custom menu-item-has-children menu-item-11230"><a class="elementor-sub-item elementor-item-anchor" href="#">AYURVED APARAJITA 2026</a>
<ul class="sub-menu elementor-nav-menu--dropdown">
<li class="menu-item menu-item-type-post_type menu-item-object-page menu-item-11231"><a class="elementor-sub-item" href="/about-ayurved-aparajita-2026">ABOUT AYURVED APARAJITA 2026</a></li>
<li class="menu-item menu-item-type-custom menu-item-object-custom menu-item-11233"><a class="elementor-sub-item" href="https://drive.google.com/file/d/1qvl9weDaBX-FO7ZiQopKg2sz2yE3o3LW/view?usp=drivesdk">BROCHURE OF AYURVED APARAJITA 2026</a></li>
<li class="menu-item menu-item-type-post_type menu-item-object-page menu-item-14332"><a class="elementor-sub-item" href="/glimpse-of-ayurmahotsava">GLIMPSE OF AYURVED APARAJITA 2026</a></li>
</ul>
</li>
<li class="menu-item menu-item-type-post_type menu-item-object-page menu-item-14535"><a class="elementor-sub-item" href="/ayurved-yashobhoomi-2026">Ayurved Yashobhoomi 2026</a></li>
</ul>
</li>
<li class="menu-item menu-item-type-post_type menu-item-object-page menu-item-has-children menu-item-14508"><a class="elementor-item" href="/ayurved-yashobhoomi-2026">Ayurved Yashobhoomi 2026</a>
<ul class="sub-menu elementor-nav-menu--dropdown">
<li class="menu-item menu-item-type-post_type menu-item-object-page menu-item-14536"><a class="elementor-sub-item" href="/ayurved-yashobhoomi-2026">ABOUT AYURVED YASHOBHOOMI 2026</a></li>
<li class="menu-item menu-item-type-custom menu-item-object-custom menu-item-14538"><a class="elementor-sub-item" href="https://drive.google.com/file/d/1_fpg23X7LBXLPbUZ6gUiXWuCmwHleJqk/view">BROCHURE OF AYURVED YASHOBHOOMI 2026</a></li>
<li class="menu-item menu-item-type-custom menu-item-object-custom menu-item-11232"><a class="elementor-sub-item elementor-item-anchor" href="/ayurved-yashobhoomi-2026/#ayv-register">REGISTRATION FOR AYURVED YASHOBHOOMI 2026</a></li>
<li class="menu-item menu-item-type-custom menu-item-object-custom menu-item-14652"><a class="elementor-sub-item" href="https://u.payu.in/PAYUMN/qJM9c6eM5XLP">BOOK ACCOMMODATION</a></li>
</ul>
</li>
<li class="menu-item menu-item-type-custom menu-item-object-custom menu-item-has-children menu-item-14873"><a class="elementor-item elementor-item-anchor" href="#">Exhibitor</a>
<ul class="sub-menu elementor-nav-menu--dropdown">
<li class="menu-item menu-item-type-post_type menu-item-object-page menu-item-14326"><a class="elementor-sub-item" href="/exhibitor-from">Exhibitor Interest Form</a></li>
<li class="menu-item menu-item-type-post_type menu-item-object-page menu-item-14329"><a class="elementor-sub-item" href="/exhibitors">Exhibitor Profile</a></li>
<li class="menu-item menu-item-type-post_type menu-item-object-page menu-item-14328"><a class="elementor-sub-item" href="/why-exhibit-with-us">Why Exhibit With Us</a></li>
</ul>
</li>
<li class="menu-item menu-item-type-post_type menu-item-object-page menu-item-14325"><a class="elementor-item" href="/call-for-paper">CALL FOR ABSTRACTS</a></li>
<li class="menu-item menu-item-type-custom menu-item-object-custom menu-item-has-children menu-item-105"><a class="elementor-item elementor-item-anchor" href="#">GALLERY</a>
<ul class="sub-menu elementor-nav-menu--dropdown">
<li class="menu-item menu-item-type-post_type menu-item-object-page menu-item-106"><a class="elementor-sub-item" href="/images/">IMAGES</a></li>
<li class="menu-item menu-item-type-post_type menu-item-object-page menu-item-107"><a class="elementor-sub-item" href="/videos/">VIDEOS</a></li>
</ul>
</li>
<li class="menu-item menu-item-type-post_type menu-item-object-page menu-item-112"><a class="elementor-item" href="/contact-us">CONTACT US</a></li>
</ul> </nav>
<div aria-expanded="false" aria-label="Menu Toggle" class="elementor-menu-toggle" role="button" tabindex="0">
<svg aria-hidden="true" class="elementor-menu-toggle__icon--open e-font-icon-svg e-eicon-menu-bar" role="presentation" viewbox="0 0 1000 1000" xmlns="http://www.w3.org/2000/svg"><path d="M104 333H896C929 333 958 304 958 271S929 208 896 208H104C71 208 42 237 42 271S71 333 104 333ZM104 583H896C929 583 958 554 958 521S929 458 896 458H104C71 458 42 487 42 521S71 583 104 583ZM104 833H896C929 833 958 804 958 771S929 708 896 708H104C71 708 42 737 42 771S71 833 104 833Z"></path></svg><svg aria-hidden="true" class="elementor-menu-toggle__icon--close e-font-icon-svg e-eicon-close" role="presentation" viewbox="0 0 1000 1000" xmlns="http://www.w3.org/2000/svg"><path d="M742 167L500 408 258 167C246 154 233 150 217 150 196 150 179 158 167 167 154 179 150 196 150 212 150 229 154 242 171 254L408 500 167 742C138 771 138 800 167 829 196 858 225 858 254 829L496 587 738 829C750 842 767 846 783 846 800 846 817 842 829 829 842 817 846 804 846 783 846 767 842 750 829 737L588 500 833 258C863 229 863 200 833 171 804 137 775 137 742 167Z"></path></svg> </div>
<nav aria-hidden="true" class="elementor-nav-menu--dropdown elementor-nav-menu__container">
<ul class="elementor-nav-menu" id="menu-2-7e44fb0"><li class="menu-item menu-item-type-post_type menu-item-object-page menu-item-home menu-item-96"><a class="elementor-item" href="../" tabindex="-1">HOME</a></li>
<li class="menu-item menu-item-type-custom menu-item-object-custom current-menu-ancestor current-menu-parent menu-item-has-children menu-item-97"><a class="elementor-item elementor-item-anchor" href="#" tabindex="-1">ABOUT US</a>
<ul class="sub-menu elementor-nav-menu--dropdown">
<li class="menu-item menu-item-type-post_type menu-item-object-page menu-item-99"><a class="elementor-sub-item" href="/about-us" tabindex="-1">ABOUT AYURVEDAM FOUNDATION</a></li>
<li class="menu-item menu-item-type-post_type menu-item-object-page current-menu-item page_item page-item-125 current_page_item menu-item-157"><a aria-current="page" class="elementor-sub-item elementor-item-active" href="/organising-team" tabindex="-1">CORE ORGANIZERS</a></li>
<li class="menu-item menu-item-type-post_type menu-item-object-page menu-item-160"><a class="elementor-sub-item" href="/our-state-ambassadors" tabindex="-1">STATE AMBASSADORS</a></li>
<li class="menu-item menu-item-type-post_type menu-item-object-page menu-item-159"><a class="elementor-sub-item" href="/associating-partners" tabindex="-1">SOCIAL MEDIA PARTNERS</a></li>
</ul>
</li>
<li class="menu-item menu-item-type-custom menu-item-object-custom menu-item-has-children menu-item-147"><a class="elementor-item elementor-item-anchor" href="#" tabindex="-1">OUR EVENTS</a>
<ul class="sub-menu elementor-nav-menu--dropdown">
<li class="menu-item menu-item-type-custom menu-item-object-custom menu-item-has-children menu-item-494"><a class="elementor-sub-item elementor-item-anchor" href="#" tabindex="-1">AYURMAHOTSAVA 2024</a>
<ul class="sub-menu elementor-nav-menu--dropdown">
<li class="menu-item menu-item-type-post_type menu-item-object-page menu-item-154"><a class="elementor-sub-item" href="/about-ayurmahotsava" tabindex="-1">ABOUT AYURMAHOTSAVA 2024</a></li>
<li class="menu-item menu-item-type-custom menu-item-object-custom menu-item-351"><a class="elementor-sub-item" href="/uploads/2025/03/AyurMahotsav@Jaipur-2k24-✨.pdf" tabindex="-1">BROCHURE OF AYURMAHOTSAVA</a></li>
<li class="menu-item menu-item-type-post_type menu-item-object-page menu-item-156"><a class="elementor-sub-item" href="/glimpse-of-ayurmahotsava" tabindex="-1">GLIMPSE OF AYURMAHOTSAVA</a></li>
</ul>
</li>
<li class="menu-item menu-item-type-custom menu-item-object-custom menu-item-has-children menu-item-15076"><a class="elementor-sub-item elementor-item-anchor" href="#" tabindex="-1">AYURVED ANANTAM 2025</a>
<ul class="sub-menu elementor-nav-menu--dropdown">
<li class="menu-item menu-item-type-post_type menu-item-object-page menu-item-1897"><a class="elementor-sub-item" href="/about-ayurved-anantam-2025" tabindex="-1">ABOUT AYURVED ANANTAM 2025</a></li>
<li class="menu-item menu-item-type-custom menu-item-object-custom menu-item-1891"><a class="elementor-sub-item" href="/uploads/2025/04/Ayurved-Anatam-2025-✨.pdf" tabindex="-1">BROCHURE OF AYURVED ANANTAM 2025</a></li>
<li class="menu-item menu-item-type-custom menu-item-object-custom menu-item-11392"><a class="elementor-sub-item" href="https://drive.google.com/file/d/1wFFSu0nreCnSo8taHv0pBbCCdVOeyhRh/view?usp=sharing" tabindex="-1">Glimpse Ayurveda Anantam</a></li>
</ul>
</li>
<li class="menu-item menu-item-type-custom menu-item-object-custom menu-item-has-children menu-item-11230"><a class="elementor-sub-item elementor-item-anchor" href="#" tabindex="-1">AYURVED APARAJITA 2026</a>
<ul class="sub-menu elementor-nav-menu--dropdown">
<li class="menu-item menu-item-type-post_type menu-item-object-page menu-item-11231"><a class="elementor-sub-item" href="/about-ayurved-aparajita-2026" tabindex="-1">ABOUT AYURVED APARAJITA 2026</a></li>
<li class="menu-item menu-item-type-custom menu-item-object-custom menu-item-11233"><a class="elementor-sub-item" href="https://drive.google.com/file/d/1qvl9weDaBX-FO7ZiQopKg2sz2yE3o3LW/view?usp=drivesdk" tabindex="-1">BROCHURE OF AYURVED APARAJITA 2026</a></li>
<li class="menu-item menu-item-type-post_type menu-item-object-page menu-item-14332"><a class="elementor-sub-item" href="/glimpse-of-ayurmahotsava" tabindex="-1">GLIMPSE OF AYURVED APARAJITA 2026</a></li>
</ul>
</li>
<li class="menu-item menu-item-type-post_type menu-item-object-page menu-item-14535"><a class="elementor-sub-item" href="/ayurved-yashobhoomi-2026" tabindex="-1">Ayurved Yashobhoomi 2026</a></li>
</ul>
</li>
<li class="menu-item menu-item-type-post_type menu-item-object-page menu-item-has-children menu-item-14508"><a class="elementor-item" href="/ayurved-yashobhoomi-2026" tabindex="-1">Ayurved Yashobhoomi 2026</a>
<ul class="sub-menu elementor-nav-menu--dropdown">
<li class="menu-item menu-item-type-post_type menu-item-object-page menu-item-14536"><a class="elementor-sub-item" href="/ayurved-yashobhoomi-2026" tabindex="-1">ABOUT AYURVED YASHOBHOOMI 2026</a></li>
<li class="menu-item menu-item-type-custom menu-item-object-custom menu-item-14538"><a class="elementor-sub-item" href="https://drive.google.com/file/d/1_fpg23X7LBXLPbUZ6gUiXWuCmwHleJqk/view" tabindex="-1">BROCHURE OF AYURVED YASHOBHOOMI 2026</a></li>
<li class="menu-item menu-item-type-custom menu-item-object-custom menu-item-11232"><a class="elementor-sub-item elementor-item-anchor" href="/ayurved-yashobhoomi-2026/#ayv-register" tabindex="-1">REGISTRATION FOR AYURVED YASHOBHOOMI 2026</a></li>
<li class="menu-item menu-item-type-custom menu-item-object-custom menu-item-14652"><a class="elementor-sub-item" href="https://u.payu.in/PAYUMN/qJM9c6eM5XLP" tabindex="-1">BOOK ACCOMMODATION</a></li>
</ul>
</li>
<li class="menu-item menu-item-type-custom menu-item-object-custom menu-item-has-children menu-item-14873"><a class="elementor-item elementor-item-anchor" href="#" tabindex="-1">Exhibitor</a>
<ul class="sub-menu elementor-nav-menu--dropdown">
<li class="menu-item menu-item-type-post_type menu-item-object-page menu-item-14326"><a class="elementor-sub-item" href="/exhibitor-from" tabindex="-1">Exhibitor Interest Form</a></li>
<li class="menu-item menu-item-type-post_type menu-item-object-page menu-item-14329"><a class="elementor-sub-item" href="/exhibitors" tabindex="-1">Exhibitor Profile</a></li>
<li class="menu-item menu-item-type-post_type menu-item-object-page menu-item-14328"><a class="elementor-sub-item" href="/why-exhibit-with-us" tabindex="-1">Why Exhibit With Us</a></li>
</ul>
</li>
<li class="menu-item menu-item-type-post_type menu-item-object-page menu-item-14325"><a class="elementor-item" href="/call-for-paper" tabindex="-1">CALL FOR ABSTRACTS</a></li>
<li class="menu-item menu-item-type-custom menu-item-object-custom menu-item-has-children menu-item-105"><a class="elementor-item elementor-item-anchor" href="#" tabindex="-1">GALLERY</a>
<ul class="sub-menu elementor-nav-menu--dropdown">
<li class="menu-item menu-item-type-post_type menu-item-object-page menu-item-106"><a class="elementor-sub-item" href="/images/" tabindex="-1">IMAGES</a></li>
<li class="menu-item menu-item-type-post_type menu-item-object-page menu-item-107"><a class="elementor-sub-item" href="/videos/" tabindex="-1">VIDEOS</a></li>
</ul>
</li>
<li class="menu-item menu-item-type-post_type menu-item-object-page menu-item-112"><a class="elementor-item" href="/contact-us" tabindex="-1">CONTACT US</a></li>
</ul> </nav>
</div>
</div>
</div>
</div>
</div>
</section>
</header>
<div class="elementor elementor-125" data-elementor-id="125" data-elementor-post-type="page" data-elementor-type="wp-page">
<div class="elementor-element elementor-element-3b87eae e-con-full e-flex e-con e-parent" data-e-type="container" data-element_type="container" data-id="3b87eae">
<div class="elementor-element elementor-element-aba5309 elementor-widget elementor-widget-html" data-e-type="widget" data-element_type="widget" data-id="aba5309" data-widget_type="html.default">
<div class="elementor-widget-container">
<link href="https://fonts.googleapis.com" rel="preconnect"/>
<link crossorigin="" href="https://fonts.gstatic.com" rel="preconnect"/>

`
      }} />

      <style dangerouslySetInnerHTML={{ __html: `
  :root {
    --bg-1: #fbeee2;
    --bg-2: #f4dec6;
    --card: #ffffff;
    --card-soft: #fff8ef;
    --gold-1: #f3d48a;
    --gold-2: #c8963c;
    --gold-3: #8a5e20;
    --maroon: #6e1b3a;
    --maroon-deep: #4a0f27;
    --copper: #9c5a2a;
    --pink-bg: #fbdce4;
    --pink-icon: #c23768;
    --ink: #3b2416;
    --line: rgba(180, 120, 50, 0.28);
  }

  .team-page-container {
    position: relative;
    overflow-x: hidden;
    width: 100%;
    background: linear-gradient(180deg, var(--bg-1), var(--bg-2));
    padding-bottom: 60px;
  }

  .elementor-location-footer {
    margin-top: 0 !important;
  }

  .organisers {
    position: relative;
    padding: 110px 24px 70px;
    max-width: 1320px;
    margin: 0 auto;
    font-family: "Poppins", sans-serif;
    color: var(--ink);
  }

  .ornament {
    position: absolute;
    width: 500px;
    height: 500px;
    opacity: 0.06;
    pointer-events: none;
    z-index: 0;
  }
  .ornament.tl {
    top: 2%;
    left: -150px;
  }
  .ornament.tr {
    top: 15%;
    right: -150px;
    transform: rotate(45deg);
  }
  .ornament.ml {
    top: 40%;
    left: -200px;
    transform: rotate(15deg);
  }
  .ornament.mr {
    top: 60%;
    right: -200px;
    transform: rotate(75deg);
  }
  .ornament.bl {
    bottom: 15%;
    left: -150px;
    transform: rotate(30deg);
  }
  .ornament.br {
    bottom: 2%;
    right: -150px;
    transform: rotate(110deg);
  }

  .header {
    position: relative;
    z-index: 2;
    text-align: center;
    margin-bottom: 78px;
  }

  .eyebrow-row {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 14px;
    margin-bottom: 18px;
  }

  .eyebrow-row .stem {
    width: 34px;
    height: 1px;
    background: linear-gradient(90deg, transparent, var(--gold-2));
  }
  .eyebrow-row .stem.right {
    background: linear-gradient(90deg, var(--gold-2), transparent);
  }

  .eyebrow {
    font-weight: 700;
    font-size: 12.5px;
    letter-spacing: 4px;
    text-transform: uppercase;
    background: linear-gradient(90deg, var(--gold-3), var(--gold-2) 45%, var(--gold-3));
    -webkit-background-clip: text;
    background-clip: text;
    color: transparent;
  }

  .leaf-icon {
    width: 16px;
    height: 16px;
    opacity: 0.85;
  }

  .title {
    font-family: "Playfair Display", serif;
    font-weight: 800;
    font-size: clamp(38px, 5.4vw, 62px);
    line-height: 1.05;
    margin: 0;
    color: var(--maroon-deep);
  }

  .title em {
    font-style: normal;
    background: linear-gradient(180deg, var(--gold-1), var(--gold-3));
    -webkit-background-clip: text;
    background-clip: text;
    color: transparent;
  }

  .subtitle {
    margin: 18px auto 0;
    max-width: 520px;
    font-size: 15px;
    line-height: 1.7;
    color: #7a5b47;
  }

  .grid {
    position: relative;
    z-index: 2;
    display: grid;
    grid-template-columns: repeat(5, 1fr);
    gap: 28px;
  }

  @media (max-width: 1180px) {
    .grid {
      grid-template-columns: repeat(3, 1fr);
    }
  }
  @media (max-width: 760px) {
    .grid {
      grid-template-columns: repeat(2, 1fr);
      gap: 20px;
    }
  }
  @media (max-width: 480px) {
    .grid {
      grid-template-columns: 1fr;
      max-width: 340px;
      margin: 0 auto;
    }
  }

  /* ---- card shell : shared floating effect for every card ---- */
  .card {
    position: relative;
    perspective: 900px;
    opacity: 0;
    transform: translateY(28px);
    transition: opacity 0.7s cubic-bezier(0.2, 0.7, 0.2, 1),
      transform 0.7s cubic-bezier(0.2, 0.7, 0.2, 1);
    height: 100%;
  }
  .card.in-view {
    opacity: 1;
    transform: translateY(0);
  }

  .card-inner {
    position: relative;
    background: linear-gradient(165deg, var(--card-soft) 0%, var(--card) 55%, #fffdf9 100%);
    border-radius: 26px;
    padding: 38px 22px 30px;
    text-align: center;
    border: 1px solid var(--line);
    transform: rotateX(var(--tiltY)) rotateY(var(--tiltX)) translateZ(0);
    transform-style: preserve-3d;
    transition: transform 0.35s cubic-bezier(0.2, 0.7, 0.2, 1), box-shadow 0.35s ease;
    box-shadow: 0 1px 0 rgba(255, 255, 255, 0.8) inset, 0 24px 48px -20px rgba(120, 60, 15, 0.35),
      0 10px 18px -12px rgba(120, 60, 15, 0.22);
    height: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
  }

  .card-inner::before {
    content: "";
    position: absolute;
    inset: 0;
    border-radius: 26px;
    padding: 1px;
    background: linear-gradient(
      160deg,
      rgba(232, 183, 101, 0.55),
      rgba(232, 183, 101, 0) 30%,
      rgba(232, 183, 101, 0) 70%,
      rgba(232, 183, 101, 0.4)
    );
    -webkit-mask: linear-gradient(#000 0 0) content-box, linear-gradient(#000 0 0);
    -webkit-mask-composite: xor;
    mask-composite: exclude;
    pointer-events: none;
  }

  .card-inner:hover {
    transform: translateY(-12px) rotateX(var(--tiltY)) rotateY(var(--tiltX));
    box-shadow: 0 1px 0 rgba(255, 255, 255, 0.9) inset, 0 36px 60px -18px rgba(120, 60, 15, 0.42),
      0 16px 24px -10px rgba(120, 60, 15, 0.28);
  }

  .founder-tag {
    position: absolute;
    top: -14px;
    left: 50%;
    transform: translateX(-50%) translateZ(40px);
    background: linear-gradient(135deg, var(--gold-1), var(--gold-2) 55%, var(--gold-3));
    color: #4a2e06;
    font-size: 10px;
    font-weight: 800;
    letter-spacing: 2px;
    padding: 6px 14px;
    border-radius: 20px;
    box-shadow: 0 6px 14px -4px rgba(150, 100, 20, 0.55), inset 0 1px 0 rgba(255, 255, 255, 0.6);
    white-space: nowrap;
  }

  /* ---- carved gold coin medallion : identical on every card ---- */
  .medallion {
    width: 148px;
    height: 148px;
    margin: 2px auto 24px;
    position: relative;
    transform: translateZ(30px);
    filter: drop-shadow(0 16px 22px rgba(120, 68, 14, 0.42));
  }

  .scallop {
    position: absolute;
    inset: 0;
    width: 100%;
    height: 100%;
    display: block;
  }

  .bevel-ring {
    position: absolute;
    inset: 15px;
    border-radius: 50%;
    background: linear-gradient(135deg, #fcebc0 0%, #e8c077 32%, #b8862e 68%, #7a5518 100%);
    box-shadow: inset -5px -7px 11px rgba(74, 42, 6, 0.55), inset 5px 6px 10px rgba(255, 246, 223, 0.85),
      0 2px 4px rgba(255, 255, 255, 0.4);
  }

  .bead-ring {
    position: absolute;
    inset: 23px;
    border-radius: 50%;
    border: 2px dotted rgba(255, 250, 235, 0.65);
    box-shadow: inset 0 0 0 1px rgba(90, 55, 10, 0.35);
    pointer-events: none;
  }

  .shine {
    position: absolute;
    inset: 15px;
    border-radius: 50%;
    background: linear-gradient(115deg, transparent 25%, rgba(255, 255, 255, 0.85) 48%, transparent 68%);
    background-size: 260% 260%;
    background-position: -40% -40%;
    animation: shineSweep 5.5s ease-in-out infinite;
    mix-blend-mode: overlay;
    pointer-events: none;
  }

  .photo-wrap {
    position: absolute;
    inset: 29px;
    border-radius: 50%;
    overflow: hidden;
    box-shadow: inset 0 3px 8px rgba(0, 0, 0, 0.3), 0 0 0 3px #fff8ef, 0 0 0 4px rgba(138, 94, 32, 0.35);
    background: linear-gradient(160deg, var(--maroon), var(--copper));
  }

  .photo-wrap img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    display: block;
  }

  .initials {
    position: absolute;
    inset: 0;
    display: flex;
    align-items: center;
    justify-content: center;
    font-family: "Playfair Display", serif;
    font-weight: 700;
    font-size: 30px;
    color: #f6e4c6;
    letter-spacing: 1px;
  }

  .name {
    font-family: "Playfair Display", serif;
    font-weight: 700;
    font-size: 17px;
    line-height: 1.28;
    color: var(--maroon);
    margin: 0 0 6px;
    transform: translateZ(24px);
  }

  .role {
    font-size: 10px;
    font-weight: 700;
    letter-spacing: 2.4px;
    text-transform: uppercase;
    color: var(--copper);
    margin: 0 0 18px;
    transform: translateZ(20px);
  }

  .role::after {
    content: "";
    display: block;
    width: 26px;
    height: 2px;
    margin: 9px auto 0;
    background: linear-gradient(90deg, var(--gold-1), var(--gold-3));
    border-radius: 2px;
  }

  .phone {
    display: inline-flex;
    align-items: center;
    gap: 8px;
    background: linear-gradient(160deg, var(--pink-bg), #f7c9d6);
    color: var(--maroon-deep);
    font-weight: 600;
    font-size: 13px;
    padding: 10px 18px;
    border-radius: 30px;
    box-shadow: 0 8px 16px -8px rgba(194, 55, 104, 0.45), inset 0 1px 0 rgba(255, 255, 255, 0.7);
    transform: translateZ(18px);
    transition: transform 0.25s ease, box-shadow 0.25s ease;
    text-decoration: none;
    margin-top: auto;
  }

  .card-inner:hover .phone {
    transform: translateZ(18px) translateY(-2px);
    box-shadow: 0 12px 20px -8px rgba(194, 55, 104, 0.55), inset 0 1px 0 rgba(255, 255, 255, 0.7);
  }

  .phone svg {
    width: 14px;
    height: 14px;
    fill: var(--pink-icon);
  }

  /* ---- Community Section styles ---- */
  .community {
    position: relative;
    padding: 70px 24px 110px;
    max-width: 1320px;
    margin: 0 auto;
    font-family: "Poppins", sans-serif;
    color: var(--ink);
    background: transparent;
  }

  .community .header {
    text-align: center;
    margin-bottom: 52px;
  }

  .community .eyebrow-row {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 14px;
    margin-bottom: 14px;
  }
  .community .eyebrow-row .stem {
    width: 34px;
    height: 1px;
    background: linear-gradient(90deg, transparent, var(--gold-2));
  }
  .community .eyebrow-row .stem.right {
    background: linear-gradient(90deg, var(--gold-2), transparent);
  }
  .community .eyebrow {
    font-weight: 700;
    font-size: 12px;
    letter-spacing: 4px;
    text-transform: uppercase;
    background: linear-gradient(90deg, var(--gold-3), var(--gold-2) 45%, var(--gold-3));
    -webkit-background-clip: text;
    background-clip: text;
    color: transparent;
  }

  .community .title {
    font-family: "Playfair Display", serif;
    font-weight: 800;
    font-size: clamp(30px, 4vw, 44px);
    margin: 0;
    color: var(--maroon-deep);
  }

  .community .grid {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 22px;
  }

  @media (max-width: 920px) {
    .community .grid {
      grid-template-columns: repeat(2, 1fr);
    }
  }
  @media (max-width: 560px) {
    .community .grid {
      grid-template-columns: 1fr;
    }
  }

  /* ---- community card overrides ---- */
  .community .card {
    opacity: 0;
    transform: translateY(20px);
    transition: opacity 0.6s cubic-bezier(0.2, 0.7, 0.2, 1), transform 0.6s cubic-bezier(0.2, 0.7, 0.2, 1);
    height: 100%;
  }
  .community .card.in-view {
    opacity: 1;
    transform: translateY(0);
  }

  .community .card-inner {
    display: flex;
    align-items: center;
    gap: 18px;
    background: linear-gradient(165deg, var(--card-soft) 0%, var(--card) 55%, #fffdf9 100%);
    border-radius: 20px;
    padding: 16px 20px;
    border: 1px solid var(--line);
    position: relative;
    perspective: 700px;
    transform: rotateX(var(--tiltY)) rotateY(var(--tiltX)) translateZ(0);
    transform-style: preserve-3d;
    transition: transform 0.3s cubic-bezier(0.2, 0.7, 0.2, 1), box-shadow 0.3s ease;
    box-shadow: 0 1px 0 rgba(255, 255, 255, 0.8) inset, 0 16px 32px -18px rgba(120, 60, 15, 0.32),
      0 6px 12px -8px rgba(120, 60, 15, 0.2);
    height: 100%;
  }

  .community .card-inner::before {
    content: "";
    position: absolute;
    inset: 0;
    border-radius: 20px;
    padding: 1px;
    background: linear-gradient(
      160deg,
      rgba(232, 183, 101, 0.5),
      rgba(232, 183, 101, 0) 30%,
      rgba(232, 183, 101, 0) 70%,
      rgba(232, 183, 101, 0.35)
    );
    -webkit-mask: linear-gradient(#000 0 0) content-box, linear-gradient(#000 0 0);
    -webkit-mask-composite: xor;
    mask-composite: exclude;
    pointer-events: none;
  }

  .community .card-inner:hover {
    transform: translateY(-6px) rotateX(var(--tiltY)) rotateY(var(--tiltX));
    box-shadow: 0 1px 0 rgba(255, 255, 255, 0.9) inset, 0 24px 40px -16px rgba(120, 60, 15, 0.38),
      0 10px 16px -8px rgba(120, 60, 15, 0.24);
  }

  .community .medallion {
    width: 68px;
    height: 68px;
    flex: 0 0 auto;
    position: relative;
    transform: translateZ(24px);
    filter: drop-shadow(0 8px 12px rgba(120, 68, 14, 0.4));
    margin: 0 !important;
  }

  .community .bevel-ring {
    position: absolute;
    inset: 7px;
    border-radius: 50%;
    background: linear-gradient(135deg, #fcebc0 0%, #e8c077 32%, #b8862e 68%, #7a5518 100%);
    box-shadow: inset -3px -4px 7px rgba(74, 42, 6, 0.55), inset 3px 3px 6px rgba(255, 246, 223, 0.85);
  }

  .community .bead-rim {
    position: absolute;
    inset: 11px;
    border-radius: 50%;
    border: 1.5px dotted rgba(255, 250, 235, 0.65);
    box-shadow: inset 0 0 0 1px rgba(90, 55, 10, 0.35);
    pointer-events: none;
  }

  .community .shine {
    position: absolute;
    inset: 7px;
    border-radius: 50%;
    background: linear-gradient(115deg, transparent 25%, rgba(255, 255, 255, 0.85) 48%, transparent 68%);
    background-size: 260% 260%;
    background-position: -40% -40%;
    animation: shineSweep 5.5s ease-in-out infinite;
    mix-blend-mode: overlay;
    pointer-events: none;
  }

  .community .photo-wrap {
    position: absolute;
    inset: 13px;
    border-radius: 50%;
    overflow: hidden;
    box-shadow: inset 0 2px 5px rgba(0, 0, 0, 0.3), 0 0 0 2px #fff8ef, 0 0 0 3px rgba(138, 94, 32, 0.35);
    background: linear-gradient(160deg, var(--maroon), var(--copper));
  }

  .community .initials {
    position: absolute;
    inset: 0;
    display: flex;
    align-items: center;
    justify-content: center;
    font-family: "Playfair Display", serif;
    font-weight: 700;
    font-size: 15px;
    color: #f6e4c6;
  }

  .community .info {
    text-align: left;
    min-width: 0;
    transform: translateZ(18px);
    flex: 1 1 auto;
  }

  .community .name {
    font-family: "Playfair Display", serif;
    font-weight: 700;
    font-size: 14px;
    line-height: 1.3;
    color: var(--maroon);
    margin: 0 0 6px;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }

  .community .phone {
    display: inline-flex;
    align-items: center;
    gap: 6px;
    font-weight: 600;
    font-size: 12px;
    color: var(--copper);
    text-decoration: none;
  }

  .community .phone svg {
    width: 12px;
    height: 12px;
    fill: var(--pink-icon);
    flex: 0 0 auto;
  }

  @keyframes shineSweep {
    0% {
      background-position: -40% -40%;
    }
    45% {
      background-position: 130% 130%;
    }
    100% {
      background-position: 130% 130%;
    }
  }

  @media (prefers-reduced-motion: reduce) {
    .card,
    .card-inner {
      transition-duration: 0.001ms !important;
      transform: none !important;
    }
    .shine {
      animation: none;
    }
  }
` }} />

      <div className="team-page-container">
        {/* Background mandala patterns */}
        <svg className="ornament tl" viewBox="0 0 200 200" fill="none" xmlns="http://www.w3.org/2000/svg">
          <g stroke="#8A5E20" strokeWidth="1">
            <circle cx="100" cy="100" r="90" />
            <circle cx="100" cy="100" r="70" />
            <path d="M100 10 C130 40 130 60 100 100 C70 60 70 40 100 10Z" />
            <path d="M100 190 C130 160 130 140 100 100 C70 140 70 160 100 190Z" />
            <path d="M10 100 C40 70 60 70 100 100 C60 130 40 130 10 100Z" />
            <path d="M190 100 C160 70 140 70 100 100 C140 130 160 130 190 100Z" />
          </g>
        </svg>
        <svg className="ornament tr" viewBox="0 0 200 200" fill="none" xmlns="http://www.w3.org/2000/svg">
          <g stroke="#8A5E20" strokeWidth="1">
            <circle cx="100" cy="100" r="90" />
            <circle cx="100" cy="100" r="70" />
            <path d="M100 10 C130 40 130 60 100 100 C70 60 70 40 100 10Z" />
            <path d="M100 190 C130 160 130 140 100 100 C70 140 70 160 100 190Z" />
            <path d="M10 100 C40 70 60 70 100 100 C60 130 40 130 10 100Z" />
            <path d="M190 100 C160 70 140 70 100 100 C140 130 160 130 190 100Z" />
          </g>
        </svg>
        <svg className="ornament ml" viewBox="0 0 200 200" fill="none" xmlns="http://www.w3.org/2000/svg">
          <g stroke="#8A5E20" strokeWidth="1">
            <circle cx="100" cy="100" r="90" />
            <circle cx="100" cy="100" r="70" />
            <path d="M100 10 C130 40 130 60 100 100 C70 60 70 40 100 10Z" />
            <path d="M100 190 C130 160 130 140 100 100 C70 140 70 160 100 190Z" />
            <path d="M10 100 C40 70 60 70 100 100 C60 130 40 130 10 100Z" />
            <path d="M190 100 C160 70 140 70 100 100 C140 130 160 130 190 100Z" />
          </g>
        </svg>
        <svg className="ornament mr" viewBox="0 0 200 200" fill="none" xmlns="http://www.w3.org/2000/svg">
          <g stroke="#8A5E20" strokeWidth="1">
            <circle cx="100" cy="100" r="90" />
            <circle cx="100" cy="100" r="70" />
            <path d="M100 10 C130 40 130 60 100 100 C70 60 70 40 100 10Z" />
            <path d="M100 190 C130 160 130 140 100 100 C70 140 70 160 100 190Z" />
            <path d="M10 100 C40 70 60 70 100 100 C60 130 40 130 10 100Z" />
            <path d="M190 100 C160 70 140 70 100 100 C140 130 160 130 190 100Z" />
          </g>
        </svg>
        <svg className="ornament bl" viewBox="0 0 200 200" fill="none" xmlns="http://www.w3.org/2000/svg">
          <g stroke="#8A5E20" strokeWidth="1">
            <circle cx="100" cy="100" r="90" />
            <circle cx="100" cy="100" r="70" />
            <path d="M100 10 C130 40 130 60 100 100 C70 60 70 40 100 10Z" />
            <path d="M100 190 C130 160 130 140 100 100 C70 140 70 160 100 190Z" />
            <path d="M10 100 C40 70 60 70 100 100 C60 130 40 130 10 100Z" />
            <path d="M190 100 C160 70 140 70 100 100 C140 130 160 130 190 100Z" />
          </g>
        </svg>
        <svg className="ornament br" viewBox="0 0 200 200" fill="none" xmlns="http://www.w3.org/2000/svg">
          <g stroke="#8A5E20" strokeWidth="1">
            <circle cx="100" cy="100" r="90" />
            <circle cx="100" cy="100" r="70" />
            <path d="M100 10 C130 40 130 60 100 100 C70 60 70 40 100 10Z" />
            <path d="M100 190 C130 160 130 140 100 100 C70 140 70 160 100 190Z" />
            <path d="M10 100 C40 70 60 70 100 100 C60 130 40 130 10 100Z" />
            <path d="M190 100 C160 70 140 70 100 100 C140 130 160 130 190 100Z" />
          </g>
        </svg>

        <section className="organisers">
          <div className="header">
            <div className="eyebrow-row">
              <span className="stem" />
              <svg className="leaf-icon" viewBox="0 0 24 24" fill="none">
                <path d="M4 20C4 10 12 4 20 4C20 12 14 20 4 20Z" fill="#C8963C" />
                <path d="M4 20C8 16 12 12 20 4" stroke="#8A5E20" strokeWidth="1" />
              </svg>
              <span className="eyebrow">Ayurvedam Foundation</span>
              <svg className="leaf-icon" viewBox="0 0 24 24" fill="none">
                <path d="M4 20C4 10 12 4 20 4C20 12 14 20 4 20Z" fill="#C8963C" />
                <path d="M4 20C8 16 12 12 20 4" stroke="#8A5E20" strokeWidth="1" />
              </svg>
              <span className="stem right" />
            </div>
            <h1 className="title">
              Core <em>Organisers</em>
            </h1>
            <p className="subtitle">
              The physicians and directors steering Ayurvedam Foundation&apos;s mission — reach out to any member directly.
            </p>
          </div>

          <div className="grid">
            {ORGANISERS.map((organiser, index) => (
              <OrganiserCard
                key={organiser.id}
                organiser={organiser}
                gradientId={"goldEdge-" + organiser.id}
                index={index}
              />
            ))}
          </div>
        </section>

        <section className="community">
          <div className="header">
            <div className="eyebrow-row">
              <span className="stem" />
              <span className="eyebrow">Ayurvedam Foundation</span>
              <span className="stem right" />
            </div>
            <h2 className="title">Community Members</h2>
          </div>

          <div className="grid">
            {MEMBERS.map((member, index) => (
              <MemberCard key={member.id} member={member} gradientId={"memberGold-" + member.id} index={index} />
            ))}
          </div>
        </section>
      </div>

      <div dangerouslySetInnerHTML={{
        __html: `<footer class="elementor elementor-166 elementor-location-footer" data-elementor-id="166" data-elementor-post-type="elementor_library" data-elementor-type="footer">
<footer class="elementor-section elementor-top-section elementor-element elementor-element-8dba296 elementor-section-boxed elementor-section-height-default elementor-section-height-default" data-e-type="section" data-element_type="section" data-id="8dba296" data-settings='{"background_background":"classic"}'>
<div class="elementor-background-overlay"></div>
<div class="elementor-container elementor-column-gap-no">
<div class="elementor-column elementor-col-100 elementor-top-column elementor-element elementor-element-1dd30853" data-e-type="column" data-element_type="column" data-id="1dd30853">
<div class="elementor-widget-wrap elementor-element-populated">
<section class="elementor-section elementor-inner-section elementor-element elementor-element-5f04329f elementor-section-boxed elementor-section-height-default elementor-section-height-default" data-e-type="section" data-element_type="section" data-id="5f04329f">
<div class="elementor-container elementor-column-gap-no">
<div class="elementor-column elementor-col-25 elementor-inner-column elementor-element elementor-element-1e6936b5" data-e-type="column" data-element_type="column" data-id="1e6936b5">
<div class="elementor-widget-wrap elementor-element-populated">
<div class="elementor-element elementor-element-c165e6c elementor-widget elementor-widget-image" data-e-type="widget" data-element_type="widget" data-id="c165e6c" data-widget_type="image.default">
<div class="elementor-widget-container">
<img alt="" class="attachment-full size-full wp-image-118" height="875" sizes="(max-width: 586px) 100vw, 586px" src="/uploads/2025/03/Untitled-design-6-e1742823184130.png" srcset="/uploads/2025/03/Untitled-design-6-e1742823184130.png 586w, /uploads/2025/03/Untitled-design-6-e1742823184130-201x300.png 201w" width="586"> </img></div>
</div>
<div class="elementor-element elementor-element-4355cab9 elementor-widget elementor-widget-text-editor" data-e-type="widget" data-element_type="widget" data-id="4355cab9" data-widget_type="text-editor.default">
<div class="elementor-widget-container">
<p>Join us as we work towards fostering a healthier, happier, and more harmonious world through Ayurveda. Let’s embark on a path of holistic healing and well-being for ourselves, our communities, and future generations.</p> </div>
</div>
<div class="elementor-element elementor-element-20f086e1 e-grid-align-left e-grid-align-mobile-left elementor-shape-rounded elementor-grid-0 elementor-widget elementor-widget-social-icons" data-e-type="widget" data-element_type="widget" data-id="20f086e1" data-widget_type="social-icons.default">
<div class="elementor-widget-container">
<div class="elementor-social-icons-wrapper elementor-grid" role="list">
<span class="elementor-grid-item" role="listitem">
<a class="elementor-icon elementor-social-icon elementor-social-icon-facebook-f elementor-repeater-item-320e991" href="https://www.facebook.com/ayurvedamfoundation" target="_blank">
<span class="elementor-screen-only">Facebook-f</span>
<svg aria-hidden="true" class="e-font-icon-svg e-fab-facebook-f" viewbox="0 0 320 512" xmlns="http://www.w3.org/2000/svg"><path d="M279.14 288l14.22-92.66h-88.91v-60.13c0-25.35 12.42-50.06 52.24-50.06h40.42V6.26S260.43 0 225.36 0c-73.22 0-121.08 44.38-121.08 124.72v70.62H22.89V288h81.39v224h100.17V288z"></path></svg> </a>
</span>
<span class="elementor-grid-item" role="listitem">
<a class="elementor-icon elementor-social-icon elementor-social-icon-youtube elementor-repeater-item-dccfaf9" href="https://www.youtube.com/@AyurvedamFoundation" target="_blank">
<span class="elementor-screen-only">Youtube</span>
<svg aria-hidden="true" class="e-font-icon-svg e-fab-youtube" viewbox="0 0 576 512" xmlns="http://www.w3.org/2000/svg"><path d="M549.655 124.083c-6.281-23.65-24.787-42.276-48.284-48.597C458.781 64 288 64 288 64S117.22 64 74.629 75.486c-23.497 6.322-42.003 24.947-48.284 48.597-11.412 42.867-11.412 132.305-11.412 132.305s0 89.438 11.412 132.305c6.281 23.65 24.787 41.5 48.284 47.821C117.22 448 288 448 288 448s170.78 0 213.371-11.486c23.497-6.321 42.003-24.171 48.284-47.821 11.412-42.867 11.412-132.305 11.412-132.305s0-89.438-11.412-132.305zm-317.51 213.508V175.185l142.739 81.205-142.739 81.201z"></path></svg> </a>
</span>
<span class="elementor-grid-item" role="listitem">
<a class="elementor-icon elementor-social-icon elementor-social-icon-instagram elementor-repeater-item-5cb7115" href="https://www.instagram.com/AyurvedamFoundation" target="_blank">
<span class="elementor-screen-only">Instagram</span>
<svg aria-hidden="true" class="e-font-icon-svg e-fab-instagram" viewbox="0 0 448 512" xmlns="http://www.w3.org/2000/svg"><path d="M224.1 141c-63.6 0-114.9 51.3-114.9 114.9s51.3 114.9 114.9 114.9S339 319.5 339 255.9 287.7 141 224.1 141zm0 189.6c-41.1 0-74.7-33.5-74.7-74.7s33.5-74.7 74.7-74.7 74.7 33.5 74.7 74.7-33.6 74.7-74.7 74.7zm146.4-194.3c0 14.9-12 26.8-26.8 26.8-14.9 0-26.8-12-26.8-26.8s12-26.8 26.8-26.8 26.8 12 26.8 26.8zm76.1 27.2c-1.7-35.9-9.9-67.7-36.2-93.9-26.2-26.2-58-34.4-93.9-36.2-37-2.1-147.9-2.1-184.9 0-35.8 1.7-67.6 9.9-93.9 36.1s-34.4 58-36.2 93.9c-2.1 37-2.1 147.9 0 184.9 1.7 35.9 9.9 67.7 36.2 93.9s58 34.4 93.9 36.2c37 2.1 147.9 2.1 184.9 0 35.9-1.7 67.7-9.9 93.9-36.2 26.2-26.2 34.4-58 36.2-93.9 2.1-37 2.1-147.8 0-184.8zM398.8 388c-7.8 19.6-22.9 34.7-42.6 42.6-29.5 11.7-99.5 9-132.1 9s-102.7 2.6-132.1-9c-19.6-7.8-34.7-22.9-42.6-42.6-11.7-29.5-9-99.5-9-132.1s-2.6-102.7 9-132.1c7.8-19.6 22.9-34.7 42.6-42.6 29.5-11.7 99.5-9 132.1-9s102.7-2.6 132.1 9c19.6 7.8 34.7 22.9 42.6 42.6 11.7 29.5 9 99.5 9 132.1s2.7 102.7-9 132.1z"></path></svg> </a>
</span>
<span class="elementor-grid-item" role="listitem">
<a class="elementor-icon elementor-social-icon elementor-social-icon-linkedin elementor-repeater-item-1491259" href="https://www.linkedin.com/AyurvedamFoundation?_l=en_US" target="_blank">
<span class="elementor-screen-only">Linkedin</span>
<svg aria-hidden="true" class="e-font-icon-svg e-fab-linkedin" viewbox="0 0 448 512" xmlns="http://www.w3.org/2000/svg"><path d="M416 32H31.9C14.3 32 0 46.5 0 64.3v383.4C0 465.5 14.3 480 31.9 480H416c17.6 0 32-14.5 32-32.3V64.3c0-17.8-14.4-32.3-32-32.3zM135.4 416H69V202.2h66.5V416zm-33.2-243c-21.3 0-38.5-17.3-38.5-38.5S80.9 96 102.2 96c21.2 0 38.5 17.3 38.5 38.5 0 21.3-17.2 38.5-38.5 38.5zm282.1 243h-66.4V312c0-24.8-.5-56.7-34.5-56.7-34.6 0-39.9 27-39.9 54.9V416h-66.4V202.2h63.7v29.2h.9c8.9-16.8 30.6-34.5 62.9-34.5 67.2 0 79.7 44.3 79.7 101.9V416z"></path></svg> </a>
</span>
</div>
</div>
</div>
</div>
</div>
<div class="elementor-column elementor-col-25 elementor-inner-column elementor-element elementor-element-7bf3b850" data-e-type="column" data-element_type="column" data-id="7bf3b850">
<div class="elementor-widget-wrap elementor-element-populated">
<div class="elementor-element elementor-element-706fb4ca elementor-widget elementor-widget-heading" data-e-type="widget" data-element_type="widget" data-id="706fb4ca" data-widget_type="heading.default">
<div class="elementor-widget-container">
<h6 class="elementor-heading-title elementor-size-default">QUICK LINKS</h6> </div>
</div>
<div class="elementor-element elementor-element-49c9b43a elementor-mobile-align-start elementor-align-start elementor-icon-list--layout-traditional elementor-list-item-link-full_width elementor-widget elementor-widget-icon-list" data-e-type="widget" data-element_type="widget" data-id="49c9b43a" data-widget_type="icon-list.default">
<div class="elementor-widget-container">
<ul class="elementor-icon-list-items">
<li class="elementor-icon-list-item">
<a href="/about-us">
<span class="elementor-icon-list-text">About Our Foundations</span>
</a>
</li>
<li class="elementor-icon-list-item">
<a href="/our-state-ambassadors">
<span class="elementor-icon-list-text">Our State Ambassadors</span>
</a>
</li>
<li class="elementor-icon-list-item">
<a href="/contact-us">
<span class="elementor-icon-list-text">Contact Us</span>
</a>
</li>
</ul>
</div>
</div>
</div>
</div>
<div class="elementor-column elementor-col-25 elementor-inner-column elementor-element elementor-element-1d631f33" data-e-type="column" data-element_type="column" data-id="1d631f33">
<div class="elementor-widget-wrap elementor-element-populated">
<div class="elementor-element elementor-element-37235e15 elementor-widget elementor-widget-heading" data-e-type="widget" data-element_type="widget" data-id="37235e15" data-widget_type="heading.default">
<div class="elementor-widget-container">
<h6 class="elementor-heading-title elementor-size-default">OTHER PAGES</h6> </div>
</div>
<div class="elementor-element elementor-element-2426a929 elementor-mobile-align-start elementor-align-start elementor-icon-list--layout-traditional elementor-list-item-link-full_width elementor-widget elementor-widget-icon-list" data-e-type="widget" data-element_type="widget" data-id="2426a929" data-widget_type="icon-list.default">
<div class="elementor-widget-container">
<ul class="elementor-icon-list-items">
<li class="elementor-icon-list-item">
<a href="/privacy-policy-2">
<span class="elementor-icon-list-text">Privacy Policy</span>
</a>
</li>
<li class="elementor-icon-list-item">
<a href="/term-and-conditions">
<span class="elementor-icon-list-text">Terms &amp; Conditions </span>
</a>
</li>
<li class="elementor-icon-list-item">
<a href="/refund_returns">
<span class="elementor-icon-list-text">Refund Policy </span>
</a>
</li>
</ul>
</div>
</div>
</div>
</div>
<div class="elementor-column elementor-col-25 elementor-inner-column elementor-element elementor-element-5d1ff73b" data-e-type="column" data-element_type="column" data-id="5d1ff73b">
<div class="elementor-widget-wrap elementor-element-populated">
<div class="elementor-element elementor-element-59520904 elementor-widget elementor-widget-heading" data-e-type="widget" data-element_type="widget" data-id="59520904" data-widget_type="heading.default">
<div class="elementor-widget-container">
<h6 class="elementor-heading-title elementor-size-default">Get In Touch</h6> </div>
</div>
<div class="elementor-element elementor-element-193eebe elementor-icon-list--layout-traditional elementor-list-item-link-full_width elementor-widget elementor-widget-icon-list" data-e-type="widget" data-element_type="widget" data-id="193eebe" data-widget_type="icon-list.default">
<div class="elementor-widget-container">
<ul class="elementor-icon-list-items">
<li class="elementor-icon-list-item">
<span class="elementor-icon-list-icon">
<i aria-hidden="true" class="icon icon-phone-call2"></i> </span>
<span class="elementor-icon-list-text">+91 63910 53105 / +91 8318714809</span>
</li>
<li class="elementor-icon-list-item">
<span class="elementor-icon-list-icon">
<i aria-hidden="true" class="icon icon-email1"></i> </span>
<span class="elementor-icon-list-text">info@ayurvedamfoundation.org</span>
</li>
<li class="elementor-icon-list-item">
<span class="elementor-icon-list-icon">
<i aria-hidden="true" class="icon icon-email1"></i> </span>
<span class="elementor-icon-list-text">expo@ayurvedamfoundation.org</span>
</li>
<li class="elementor-icon-list-item">
<span class="elementor-icon-list-icon">
<i aria-hidden="true" class="icon icon-map-marker1"></i> </span>
<span class="elementor-icon-list-text">SH8/3A/7K-1 Ayodhya Dham Colony, Luxmanpur, Olympian Lalit Upadhyay Gate, Shivpur Bypass Road, Shivpur, Varanasi ,Pin Code - 221003</span>
</li>
</ul>
</div>
</div>
</div>
</div>
</div>
</section>
</div>
</div>
</div>
</footer>
<section class="elementor-section elementor-top-section elementor-element elementor-element-06ed12a elementor-section-boxed elementor-section-height-default elementor-section-height-default" data-e-type="section" data-element_type="section" data-id="06ed12a" data-settings='{"background_background":"gradient"}'>
<div class="elementor-container elementor-column-gap-default">
<div class="elementor-column elementor-col-50 elementor-top-column elementor-element elementor-element-9ca8ffc" data-e-type="column" data-element_type="column" data-id="9ca8ffc">
<div class="elementor-widget-wrap elementor-element-populated">
<div class="elementor-element elementor-element-a3dc79a elementor-mobile-align-center elementor-icon-list--layout-traditional elementor-list-item-link-full_width elementor-widget elementor-widget-icon-list" data-e-type="widget" data-element_type="widget" data-id="a3dc79a" data-widget_type="icon-list.default">
<div class="elementor-widget-container">
<ul class="elementor-icon-list-items">
<li class="elementor-icon-list-item">
<a href="../">
<span class="elementor-icon-list-text">© 2026 ayurvedamfoundation.org  All Rights Reserved by Indudevi Charitable foundation.</span>
</a>
</li>
</ul>
</div>
</div>
</div>
</div>
<div class="elementor-column elementor-col-50 elementor-top-column elementor-element elementor-element-1d13da0" data-e-type="column" data-element_type="column" data-id="1d13da0">
<div class="elementor-widget-wrap elementor-element-populated">
<div class="elementor-element elementor-element-c799a26 elementor-mobile-align-center elementor-align-end elementor-icon-list--layout-traditional elementor-list-item-link-full_width elementor-widget elementor-widget-icon-list" data-e-type="widget" data-element_type="widget" data-id="c799a26" data-widget_type="icon-list.default">
<div class="elementor-widget-container">
<ul class="elementor-icon-list-items">
<li class="elementor-icon-list-item">
<span class="elementor-icon-list-text"></span>
</li>
</ul>
</div>
</div>
</div>
</div>
</div>
</section>
</footer>\``
      }} />
    </>
  );
}
