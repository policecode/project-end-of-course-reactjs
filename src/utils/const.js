export const API_METHOD = {
  GET: "get",
  POST: "post",
  PUT: "put",
  DELETE: "delete",
  PATCH: "patch"
};

export const API_CODE = {
  Succeed: 200,
  DeleteSucceed: 202,
  BadRequestError: 400,
  NotFoundError: 404,
  UnauthorizedError: 401,
  Forbidden: 403,
  InternalServerError: 500,
  ApiGatewayTimeoutError: 504,
};

export const PAGING = {
  PerPage: 20
}

export const URL_API = {
  // baseApiUrl: `https://hoangdat-json-server.vercel.app/`,
  baseApiUrl: `http://localhost:3000/`
}


export const PROCESS_STATUS = {
  PENDING: 0,
  RUNNING: 1,
  FINISHED: 2,
  STOPPED: 3
}

export const optionCategory = [
  { value: 'Tiên Hiệp', label: 'Tiên Hiệp', slug: 'tien-hiep' },
  { value: 'Kiếm Hiệp', label: 'Kiếm Hiệp', slug: 'kiem-hiep' },
  { value: 'Ngôn Tình', label: 'Ngôn Tình', slug: 'ngon-tinh' },
  { value: 'Đam Mỹ', label: 'Đam Mỹ', slug: 'dam-my' },
  { value: 'Quan Trường', label: 'Quan Trường', slug: 'quan-truong' },
  { value: 'Khoa Huyễn', label: 'Khoa Huyễn', slug: 'khoa-huyen' },
  { value: 'Hệ Thống', label: 'Hệ Thống', slug: 'he-thong' },
  { value: 'Huyền Huyễn', label: 'Huyền Huyễn', slug: 'huyen-huyen' },
  { value: 'Dị Giới', label: 'Dị Giới', slug: 'di-gioi' },
  { value: 'Dị Năng', label: 'Dị Năng', slug: 'di-nang' },
  { value: 'Quân Sự', label: 'Quân Sự', slug: 'quan-su' },
  { value: 'Lịch Sử', label: 'Lịch Sử', slug: 'lich-su' },
  { value: 'Xuyên Không', label: 'Xuyên Không', slug: 'xuyen-khong' },
  { value: 'Xuyên Nhanh', label: 'Xuyên Nhanh', slug: 'xuyen-nhanh' },
  { value: 'Trọng Sinh', label: 'Trọng Sinh', slug: 'trong-sinh' },
  { value: 'Trinh Thám', label: 'Trinh Thám', slug: 'trinh-tham' },
  { value: 'Thám Hiểm', label: 'Thám Hiểm', slug: 'tham-hiem' },
  { value: 'Linh Dị', label: 'Linh Dị', slug: 'linh-di' },
  { value: 'Ngược', label: 'Ngược', slug: 'nguoc' },
  { value: 'Sủng', label: 'Sủng', slug: 'sung' },
  { value: 'Cung Đấu', label: 'Cung Đấu', slug: 'cung-dau' },
  { value: 'Nữ Cường', label: 'Nữ Cường', slug: 'nu-cuong' },
  { value: 'Gia Đấu', label: 'Gia Đấu', slug: 'gia-dau' },
  { value: 'Đông Phương', label: 'Đông Phương', slug: 'dong-phuong' },
  { value: 'Đô Thị', label: 'Đô Thị', slug: 'do-thi' },
  { value: 'Bách Hợp', label: 'Bách Hợp', slug: 'bach-hop' },
  { value: 'Hài Hước', label: 'Hài Hước', slug: 'hai-huoc' },
  { value: 'Điền Văn', label: 'Điền Văn', slug: 'dien-van' },
  { value: 'Cổ Đại', label: 'Cổ Đại', slug: 'co-dai' },
  { value: 'Mạt Thế', label: 'Mạt Thế', slug: 'mat-the' },
  { value: 'Truyện Teen', label: 'Truyện Teen', slug: 'truyen-teen' },
  { value: 'Phương Tây', label: 'Phương Tây', slug: 'phuong-tay' },
  { value: 'Nữ Phụ', label: 'Nữ Phụ', slug: 'nu-phu' },
  { value: 'Light Novel', label: 'Light Novel', slug: 'light-novel' },
  { value: 'Việt Nam', label: 'Việt Nam', slug: 'viet-nam' },
  { value: 'Đoản Văn', label: 'Đoản Văn', slug: 'doan-van' },
  { value: 'Khác', label: 'Khác', slug: 'khac' }
];
