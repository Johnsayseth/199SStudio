// Team Data for 199S Studio
// This file contains all team member and company value data
// Extracted from TeamSection.tsx for better organization

export interface TeamMember {
  id: number;
  name: string;
  position: string;
  image: string;
  description: string;
  socialLinks: {
    facebook: string;
    instagram: string;
  };
}

export interface CompanyValue {
  id: number;
  icon: string;
  title: string;
  description: string;
  color: string;
}

// Team Members Data
export const teamMembers: TeamMember[] = [
  {
    id: 1,
    name: "Công Tịnh",
    position: "Founder",
    image: "/images/team/congtinh2.jpg",
    description: "9 năm nhiếp ảnh kỷ yếu – cưới – chân dung thương mại ",
    socialLinks: {
      facebook: "https://www.facebook.com/congtinh.199syearbook",
      instagram: "https://www.instagram.com/congtinh.foto/",
    },
  },
  {
    id: 2,
    name: "Hữu Việt",
    position: "Co Founder - Manager",
    image: "/images/team/hip.jpeg",
    description:
      "8 năm nhiếp ảnh & quản lý sản xuất, triển khai >200 buổi chụp nhiều quy mô.",
    socialLinks: {
      facebook: "https://www.facebook.com/viethip.cii",
      instagram: "https://www.instagram.com/im_Viehip/",
    },
  },
  {
    id: 3,
    name: "Dương Nguyễn",
    position: "Production Manager",
    image: "/images/team/IMG_0997.JPG",
    description: "7 năm sản xuất ảnh, color grading & quản lý thư viện số.",
    socialLinks: {
      facebook: "https://www.facebook.com/duongfoto",
      instagram: "https://www.instagram.com/_fotoz.h520/",
    },
  },
  {
    id: 4,
    name: "Nguyễn Đức",
    position: "Marketing Manager",
    image: "/images/team/82502916_2476801645901135_6646091965026795520_n.jpg",
    description: "6 năm quảng cáo & digital communications.",
    socialLinks: {
      facebook: "https://www.facebook.com/nguyen.uc.788150",
      instagram: "https://www.instagram.com/nguyenduc_0706/",
    },
  },
];

// Company Values Data
export const companyValues: CompanyValue[] = [
  {
    id: 1,
    icon: "bi bi-heart-fill",
    title: "Đam mê",
    description: "Chúng tôi làm việc với tất cả đam mê và nhiệt huyết",
    color: "#ff6b6b",
  },
  {
    id: 2,
    icon: "bi bi-lightbulb-fill",
    title: "Sáng tạo",
    description: "Luôn tìm kiếm những ý tưởng mới và độc đáo",
    color: "#4ecdc4",
  },
  {
    id: 3,
    icon: "bi bi-award-fill",
    title: "Chất lượng",
    description: "Cam kết mang đến chất lượng tốt nhất cho khách hàng",
    color: "#45b7d1",
  },
  {
    id: 4,
    icon: "bi bi-people-fill",
    title: "Đồng đội",
    description: "Làm việc nhóm hiệu quả, hỗ trợ lẫn nhau",
    color: "#96ceb4",
  },
];
