'use client';

import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import Pagination from '../pagination';
// import { getAllGoodPoint, getAllProvince } from "@/api/data";
import { useDebouncedCallback } from 'use-debounce';
import '@/css/employee/customTable.css';

export default function GoodPointTable({ page, query, limit }: any) {
  // const provinceData = getAllProvince();

  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { replace } = useRouter();

  const debounce = (type: string) =>
    useDebouncedCallback((term) => {
      const params = new URLSearchParams(searchParams);
      if (term) {
        params.set(type, term);
      } else {
        params.delete(type);
      }
      replace(`${pathname}?${params.toString()}`);
    }, 300);

  const handleName = debounce('name');
  const handleAddress = debounce('address');

  const handleOnStockQuantitySort = useDebouncedCallback((term) => {
    const params = new URLSearchParams(searchParams);
    if (term) {
      params.set('onStockQuantitySort', term);
      params.delete('forwardedQuantitySort');
      params.delete('arrivingQuantitySort');
    } else {
      params.delete('onStockQuantitySort');
    }
    replace(`${pathname}?${params.toString()}`);
  }, 300);

  const handleArrivingQuantitySort = useDebouncedCallback((term) => {
    const params = new URLSearchParams(searchParams);
    if (term) {
      params.set('arrivingQuantitySort', term);
      params.delete('forwardedQuantitySort');
      params.delete('onStockQuantitySort');
    } else {
      params.delete('arrivingQuantitySort');
    }
    replace(`${pathname}?${params.toString()}`);
  }, 300);

  // const handleForwardedQuantitySort = useDebouncedCallback((term) => {
  //   const params = new URLSearchParams(searchParams);
  //   if (term) {
  //     params.set('forwardedQuantitySort', term);
  //     params.delete('onStockQuantitySort');
  //     params.delete('arrivingQuantitySort');
  //   } else {
  //     params.delete('forwardedQuantitySort');
  //   }
  //   replace(`${pathname}?${params.toString()}`);
  // }, 300);

  const handleForwardedQuantitySort = () => {
    console.log('forwardedQuantitySort');
  };

  // const dataRes = getAllGoodPoint(page || 1, limit || 8, query);
  const goodsPoints = [];
  // if (dataRes)
  //     for (const goodsPoint of dataRes.goodsPoints) {
  //         goodsPoints.push(goodsPoint)
  //     }

  return (
    <div>
      <div className="mt-2 flow-root table">
        <div className="inline-block min-w-full align-middle d-flex justify-content-center">
          <div className="rounded-lg bg-gray-50 md:pt-0 table-responsive">
            <table className="goodPointTable">
              <thead>
                <tr>
                  <th scope="col">STT</th>
                  <th scope="col">Trưởng điểm</th>
                  <th scope="col">Địa chỉ</th>
                  <th scope="col">Đơn hàng dang den</th>
                  <th scope="col">Đơn hàng ton kho</th>
                  <th scope="col">Đơn hàng da chuyen</th>
                </tr>
                {
                  <tr className="filter">
                    <th scope="col"></th>
                    <th scope="col">
                      <input onChange={(e) => handleName(e.target.value)} placeholder="Lọc theo tên trưởng điểm" />
                    </th>
                    <th scope="col">
                      <select onChange={(e) => handleAddress(e.target.value)}>
                        <option value="">Chọn tỉnh/ thành phố</option>
                        {/* {provinceData.map((province) => (
                                                <option
                                                    key={province.provinceID}
                                                    value={province.provinceID}
                                                >
                                                    {province.name}
                                                </option>
                                            ))} */}
                      </select>
                    </th>
                    <th scope="col">
                      <select onChange={(e) => handleArrivingQuantitySort(e.target.value)}>
                        <option value="">Sắp xếp theo</option>
                        <option value="ASC">Tăng</option>
                        <option value="DESC">Giảm</option>
                      </select>
                    </th>
                    <th scope="col">
                      <select onChange={(e) => handleOnStockQuantitySort(e.target.value)}>
                        <option value="">Sắp xếp theo</option>
                        <option value="ASC">Tăng</option>
                        <option value="DESC">Giảm</option>
                      </select>
                    </th>
                    <th scope="col" onChange={(e) => handleForwardedQuantitySort()}>
                      <select>
                        <option value="">Sắp xếp theo</option>
                        <option value="ASC">Tăng</option>
                        <option value="DESC">Giảm</option>
                      </select>
                    </th>
                  </tr>
                }
              </thead>
              <tbody className="table-group-divider">
                {/* {goodsPoints.map((data, index) => (
                                    <tr key={data.head?.employeeID}>
                                        <td>{index + 1}</td>
                                        <td>{data.head?.fullName}</td>
                                        <td>
                                            {data.address.detail}, {data.address.commune.name},{" "}
                                            {data.address.district.name},{" "}
                                            {data.address.province.name}
                                        </td>
                                        <td>{data.arrivingOrders}</td>
                                        <td>{data.onStockOrders}</td>
                                        <td>{data.forwardedOrders}</td>
                                    </tr>
                                ))} */}
              </tbody>
            </table>
          </div>
        </div>
      </div>
      {/* <Pagination totalPage={dataRes?.totalPages || 1} /> */}
    </div>
  );
}
