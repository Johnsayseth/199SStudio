// About Data for 199S Studio
// This file contains all about section data
// Extracted from AboutSection.tsx for better organization

export interface CoreValue {
  icon: string;
  title: string;
  description: string;
  color: string;
}

// Core Values Data
export const coreValues: CoreValue[] = [
  {
    icon: "bi-clock",
    title: "Sẵn sàng thời gian",
    description:
      "Thời gian của bạn là ưu tiên số một của chúng tôi. Trực chiến 24/7, sẵn sàng xông pha để tạo nên trải nghiệm tối ưu nhất cho bạn.",
    color: "#ff6b6b",
  },
  {
    icon: "bi-lightbulb",
    title: "Sẵn sàng ý tưởng",
    description:
      "Cập nhật concept đa dạng, bắt trend thần tốc, đồng thời chúng tôi sẽ tìm ra phong cách phù hợp nhất với cá tính riêng và câu chuyện của từng lớp.",
    color: "#4ecdc4",
  },
  {
    icon: "bi-award",
    title: "Sẵn sàng chất lượng",
    description:
      "Ảnh đẹp là điều hiển nhiên, nhưng cảm xúc và kỷ niệm trọn vẹn của buổi chụp mới chính là món quà chúng tôi muốn trao gửi.",
    color: "#45b7d1",
  },
  {
    icon: "bi-heart",
    title: "Sẵn sàng phục vụ",
    description:
      "Từ việc chuẩn bị phụ kiện, makeup đến hướng dẫn dáng chụp, chúng tôi chăm chút từng chi tiết nhỏ nhất. Bên cạnh đó còn là động viên, cổ vũ những bạn ngại ống kính tự tin tỏa sáng.",
    color: "#96ceb4",
  },
];

// About Section Tabs
export const aboutTabs = [
  {
    id: "story",
    title: "Câu Chuyện",
    content: "story",
  },
  {
    id: "mission",
    title: "Sứ Mệnh",
    content: "mission",
  },
  {
    id: "vision",
    title: "Tầm Nhìn",
    content: "vision",
  },
  {
    id: "values",
    title: "Giá Trị Cốt Lõi",
    content: "values",
  },
];
