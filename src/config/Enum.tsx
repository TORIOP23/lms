import { MdOutlineDashboard } from 'react-icons/md';
import { IoPeopleOutline } from 'react-icons/io5';
import { LuPackage2 } from 'react-icons/lu';
import { RiRoadMapLine } from 'react-icons/ri';
import { HiOutlineBuildingOffice } from 'react-icons/hi2';

export enum RoleEnum {
  Admin = 'Admin',
  User = 'User',
  Driver = 'Driver',
  Employee = 'Employee',
  Manager = 'Manager',
}

export const Role = {
  Admin: {
    name: 'Quản trị viên',
    role: 'Admin',
    right: ['dashboard', 'manageGoodsPoint', 'manageTransactions', 'manageEmployees'],
    left: ['manageOrders', 'createOrder'],
  },
  Manager: {
    name: 'Nhân viên điểm tập kết',
    role: 'GOODS_POINT_EMPLOYEE',
    left: ['manageEmployees', 'manageGoodsPoint', 'manageTransactions'],
    right: ['dashboard', 'manageOrders'],
  },
  Driver: {
    name: 'Quản lí điểm tập kết',
    role: 'GOODS_POINT_HEAD',
    left: ['manageGoodsPoint', 'manageTransactions', 'createOrder'],
    right: ['dashboard', 'manageOrders', 'manageEmployees'],
  },
  Employee: {
    name: 'Nhân viên điểm giao dịch',
    role: 'TRANSACTION_POINT_EMPLOYEE',
    left: ['manageGoodsPoint', 'manageTransactions', 'manageEmployees'],
    right: ['dashboard', 'manageOrders'],
  },
  User: {
    name: 'Quản lí điểm giao dịch',
    role: 'TRANSACTION_POINT_HEAD',
    left: ['manageGoodsPoint', 'manageTransactions', 'createOrder'],
    right: ['dashboard', 'manageOrders', 'manageEmployees'],
  },
};

export const listUrl = {
  dashboard: {
    url: '/dashboard',
    name: 'Trang chính',
    icon: <MdOutlineDashboard size={'2em'} />,
  },
  manageEmployees: {
    url: '/dashboard/employee',
    name: 'Nhân viên',
    icon: <IoPeopleOutline size={'2em'} />,
  },
  manageOrders: {
    url: '/dashboard/ordered',
    name: 'Đơn hàng',
    icon: <LuPackage2 size={'2em'} />,
  },
  manageGoodsPoint: {
    url: '/dashboard/workplate',
    name: 'Điểm tập kết',
    icon: <RiRoadMapLine size={'2em'} />,
  },
  manageTransactions: {
    url: '/dashboard/transaction',
    name: 'Điểm giao dịch',
    icon: <HiOutlineBuildingOffice size={'2em'} />,
  },
  createEmployee: {
    url: '/dashboard/employee/create',
    name: 'Tạo tài khoản nhân viên',
    icon: <HiOutlineBuildingOffice size={'2em'} />,
  },
  createOrder: {
    url: '/dashboard/ordered/create',
    name: 'Tạo đơn hàng',
    icon: <HiOutlineBuildingOffice size={'2em'} />,
  },
  detailEmployee: {
    url: '/dashboard/employee/[id]/detail',
    name: 'Thông tin nhân viên',
    icon: <HiOutlineBuildingOffice size={'2em'} />,
  },
  detailOrder: {
    url: '/dashboard/ordered/[id]/detail',
    name: 'Chi tiết đơn hàng',
    icon: <HiOutlineBuildingOffice size={'2em'} />,
  },
};
