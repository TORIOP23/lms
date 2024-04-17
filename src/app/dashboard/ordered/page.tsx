'use client';
import { useAppContext } from '@/app/app-provider';
import { CreateOrder } from '@/components/dashboard/button';
import OrderTable from '@/components/dashboard/table/order-table';

interface IOrderPage {
  searchParams: {
    page: number;
    orderID: string;
    startAddress: string;
    endAddress: string;
    status: string;
    timeCreate: string;
  };
}

export default async function OrderPage(searchParams: IOrderPage) {
  const query = {
    ...searchParams.searchParams,
  };
  const currentPage = query.page || 1;
  const { user } = useAppContext();
  const userRole = user?.role.name;

  return (
    <div className="tableContainer">
      <div className="row">
        <div className="col">
          <h3>Danh sách đơn hàng</h3>
        </div>
        {userRole === 'Employee' && (
          <div className="col btnContainer">
            <CreateOrder />
          </div>
        )}
      </div>

      <div className="row">
        <OrderTable page={currentPage} query={query} showFilter={true}></OrderTable>
      </div>
    </div>
  );
}