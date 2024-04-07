"use client";
import { useState, useEffect } from "react";
import { employeeRole, employeeStatus } from "@/api/utils";
import { getEmployeebyID } from "@/api/data";
import { Row, Col, Form } from "react-bootstrap";
import useSWR from "swr";
import { useSession } from "next-auth/react";
import PopUp from "../popup";
import { editEmployee } from "@/api/action";
import "@/css/employee/customForm.css";

export default function EmployeeInformation({ id }) {
  const token = useSession().data?.accessToken;
  const employee = getEmployeebyID(id);
  const listRole = [
    employeeRole["TRANSACTION_POINT_HEAD"],
    employeeRole["GOODS_POINT_HEAD"],
    employeeRole["GOODS_POINT_EMPLOYEE"],
    employeeRole["TRANSACTION_POINT_EMPLOYEE"],
  ];
  useEffect(() => {
    setNewInfor({
      status: employee?.status,
      role: employee?.role,
      workingPointID: employee?.workingPointID,
    });
    setWorkingAddress({
      provinceID: employee?.workingPoint?.address?.province?.provinceID,
      communeID: employee?.workingPoint?.address?.commune?.communeID,
      districtID: employee?.workingPoint?.address?.district?.districtID,
      workingPointID: employee?.workingPointID,
    });
    setProvinceID(employee?.workingPoint?.address?.province?.provinceID);
    setDistrictID(employee?.workingPoint?.address?.district?.districtID);
    setCommuneID(employee?.workingPoint?.address?.commune?.communeID);
  }, [employee]);
  const [newInfor, setNewInfor] = useState();

  const [workingAddress, setWorkingAddress] = useState();

  const [provinceID, setProvinceID] = useState();
  const [districtID, setDistrictID] = useState();
  const [communeID, setCommuneID] = useState();

  const { data: allProvincePoint, isLoading: isLoading } = useSWR([
    "https://magicpost-uet.onrender.com/api/routingPoint/getallprovinces/",
    token,
  ]);
  const { data: allDistrictsPoint } = useSWR([
    `https://magicpost-uet.onrender.com/api/routingPoint/getalldistricts/${provinceID}`,
    token,
  ]);
  const { data: allCommunePoint } = useSWR([
    `https://magicpost-uet.onrender.com/api/routingPoint/getallcommunes/${districtID}`,
    token,
  ]);
  const [urlWorkingPoint, setUrl] = useState(
    `https://magicpost-uet.onrender.com/api/transactionPoint/customerGet/?provinceID=${provinceID}&districtID=${districtID}&communeID=${communeID}`
  );
  useEffect(() => {
    setUrl(
      `https://magicpost-uet.onrender.com/api/transactionPoint/customerGet/?provinceID=${provinceID}&districtID=${districtID}&communeID=${communeID}`
    );
  }, [provinceID, districtID, communeID]);
  const { data: transactionPoint } = useSWR([urlWorkingPoint, token]);

  const [change, setChange] = useState(false);
  const [popup, setPopup] = useState(false);
  useEffect(() => {
    if (newInfor) {
      if (
        newInfor?.status !== employee?.status ||
        newInfor?.role !== employee?.role ||
        newInfor?.workingPointID !== employee?.workingPointID
      )
        setChange(true);
    }
  }, [newInfor]);
  return (
    <div className="formContainer">
      <form id="form-employee ">
        <div className="row">
          <h3>Thông tin nhân viên</h3>
        </div>
        <div className="row mt-2">
          <div className="col-md-6">
            <label htmlFor="fullName">Họ và tên</label>
            <input
              type="text"
              className="form-control"
              id="fullName"
              placeholder="Họ và tên"
              defaultValue={employee?.fullName}
              disabled
            />
          </div>

          <div className="col-md-6">
            <label htmlFor="dob">Ngày sinh</label>
            <input
              type="date"
              className="form-control"
              id="dob"
              defaultValue={employee?.birthDate}
              disabled
            />
          </div>
        </div>

        <div className="row mt-2">
          <div className="col-md-6">
            <label htmlFor="employeeID">Ma nhan vien</label>
            <input
              type="tel"
              className="form-control"
              id="employeeID"
              placeholder="Số điện thoại"
              defaultValue={id}
              disabled
            />
          </div>
          <div className="col-md-6">
            <label htmlFor="phoneNumber">Số điện thoại</label>
            <input
              type="tel"
              className="form-control"
              id="phoneNumber"
              placeholder="Số điện thoại"
              defaultValue={employee?.phoneNumber}
              disabled
            />
          </div>
        </div>

        <div className="row mt-2">
          <div className="col">
            <label htmlFor="phoneNumber">CCCD</label>
            <input
              type="tel"
              className="form-control"
              id="phoneNumber"
              placeholder="CCCD"
              defaultValue={employee?.identifier}
              disabled
            />
          </div>
          <div className="col-md-6">
            <label htmlFor="email">Địa chỉ Email</label>
            <input
              type="email"
              className="form-control"
              id="email"
              placeholder="Địa chỉ email"
              defaultValue={employee?.email}
              disabled
            />
          </div>
        </div>

        <div className="row ">
          <div>Giới tính</div>
          <div className="col">
            <select className="form-select" value={employee?.gender} disabled>
              <option value={"female"}>Nữ</option>
              <option value={"male"}>Nam</option>
            </select>
          </div>
        </div>

        <div className="row mt-2">
          <label htmlFor="province" className="col-sm-12 col-form-label">
            Địa chỉ
          </label>
          <div className="col-md-4">
            <input
              type="tel"
              className="form-control"
              id="phoneNumber"
              placeholder="CCCD"
              defaultValue={employee?.address?.province?.name}
              disabled
            />
          </div>

          <div className="col-md-4">
            <input
              type="tel"
              className="form-control"
              id="phoneNumber"
              placeholder="CCCD"
              defaultValue={employee?.address?.district?.name}
              disabled
            />
          </div>

          <div className="col-md-4">
            <input
              type="tel"
              className="form-control"
              id="phoneNumber"
              placeholder="CCCD"
              defaultValue={employee?.address?.commune?.name}
              disabled
            />
          </div>
        </div>

        <div className="row mt-2">
          <div className="col">
            <input
              className="form-control"
              id="addressDetail"
              placeholder="Chi tiết"
              defaultValue={employee?.address?.detail}
              disabled
            />
          </div>
        </div>

        <div className="row mt-2">
          <div className="col-md-6 col-xs-12">
            <label htmlFor="transactionPoint">Trạng thái</label>
            <select
              className="form-select"
              value={newInfor?.status}
              onChange={(e) => {
                setNewInfor({
                  status: e.target.value,
                  role: newInfor.role,
                  workingPointID: newInfor.workingPointID,
                });
              }}
            >
              <option value={0}>Trạng thái</option>
              {Object.keys(employeeStatus).map((statusKey) => (
                <option key={statusKey} value={statusKey}>
                  {employeeStatus[statusKey].name}
                </option>
              ))}
            </select>
          </div>
          <div className="col-md-6 col-xs-12">
            <label htmlFor="role">Vai trò</label>
            <select
              className="form-select"
              aria-label="Default select example"
              id="role"
              value={newInfor?.role}
              onChange={(e) =>
                setNewInfor({
                  status: newInfor.status,
                  role: e.target.value,
                  workingPointID: newInfor.workingPointID,
                })
              }
            >
              {listRole.map((e) => {
                return <option value={e?.role}>{e?.name}</option>;
              })}
            </select>
          </div>
        </div>

        <Row>
          <Form.Group
            htmlFor="province"
            className="col-sm-12 col-form-Form.Group"
          >
            Địa điểm làm việc
          </Form.Group>
          <Col>
            <select
              className="form-select"
              value={workingAddress?.provinceID}
              onChange={(e) => {
                setWorkingAddress({
                  provinceID: Number(e.target.value),
                  communeID: 0,
                  districtID: 0,
                  workingPointID: workingAddress?.workingPointID,
                });
                setUrl(
                  `https://magicpost-uet.onrender.com/api/transactionPoint/customerGet/?provinceID=${e.target.value}`
                );
                setNewInfor({
                  status: newInfor.status,
                  role: newInfor.role,
                  workingPointID: 0,
                });
                setProvinceID(Number(e.target.value));
                setCommuneID(0);
                setDistrictID(0);
              }}
            >
              <option value={0}>Chọn tỉnh/TP</option>
              {Array.isArray(allProvincePoint) &&
                allProvincePoint?.map((province) => (
                  <option value={Number(province.provinceID)}>
                    {province.name}
                  </option>
                ))}
            </select>
          </Col>
          <Col>
            <select
              className="form-select"
              value={workingAddress?.districtID}
              onChange={(e) => {
                setWorkingAddress({
                  provinceID: workingAddress?.provinceID,
                  communeID: 0,
                  districtID: Number(e.target.value),
                  workingPointID: workingAddress?.workingPointID,
                });
                setProvinceID(workingAddress?.provinceID);
                setCommuneID(0);
                setDistrictID(e.target.value);
                setUrl(
                  `https://magicpost-uet.onrender.com/api/transactionPoint/customerGet/?provinceID=${workingAddress.provinceID}&districtID=${e.target.value}`
                );
                setNewInfor({
                  status: newInfor.status,
                  role: newInfor.role,
                  workingPointID: 0,
                });
              }}
            >
              <option value={0}>Chọn Quận/Huyện</option>
              {Array.isArray(allDistrictsPoint) &&
                allDistrictsPoint?.map((province) => (
                  <option value={Number(province.districtID)}>
                    {province.name}
                  </option>
                ))}
            </select>
          </Col>
          <Col>
            <select
              className="form-select"
              value={workingAddress?.communeID}
              onChange={(e) => {
                setWorkingAddress({
                  provinceID: workingAddress?.provinceID,
                  communeID: Number(e.target.value),
                  districtID: workingAddress?.districtID,
                  workingPointID: workingAddress?.workingPointID,
                });
                setProvinceID(workingAddress?.provinceID);
                setCommuneID(e.target.value);
                setDistrictID(workingAddress?.districtID);
                setUrl(
                  `https://magicpost-uet.onrender.com/api/transactionPoint/customerGet/?provinceID=${workingAddress.provinceID}&districtID=${workingAddress.districtID}&communeID=${e.target.value}`
                );
                setNewInfor({
                  status: newInfor.status,
                  role: newInfor.role,
                  workingPointID: 0,
                });
              }}
            >
              <option selected value={0}>
                Chọn Xã/Phường
              </option>
              {Array.isArray(allCommunePoint) &&
                allCommunePoint?.map((province) => (
                  <option value={Number(province.communeID)}>
                    {province.name}
                  </option>
                ))}
            </select>
          </Col>
          <Col>
            <select
              className="form-select"
              value={workingAddress?.workingPointID}
              onChange={(e) => {
                setWorkingAddress({
                  provinceID: workingAddress?.provinceID,
                  communeID: workingAddress?.communeID,
                  districtID: workingAddress?.districtID,
                  workingPointID: Number(e.target.value),
                });
                setNewInfor({
                  status: newInfor.status,
                  role: newInfor.role,
                  workingPointID: e.target.value,
                });
              }}
            >
              <option selected>Địa điểm làm việc</option>
              {Array.isArray(transactionPoint) &&
                transactionPoint?.map((province) => (
                  <option value={Number(province.transactionPointID)}>
                    {province.name}
                  </option>
                ))}
            </select>
          </Col>
        </Row>
      </form>
      <div className="mt-3 btnContainer">
        <button
          onClick={() => {
            setPopup(!popup);
          }}
          className="btn btnCreate"
          disabled={change ? false : true}
        >
          Sửa đổi
        </button>

        <button
          type="button"
          className="btn btn-secondary"
          onClick={() => {
            console.log(urlWorkingPoint);
          }}
        >
          Xóa
        </button>
        {/* <div>Error {error}</div> */}
      </div>
      <PopUp
        isOpen={popup}
        setIsOpen={setPopup}
        functionCreate={editEmployee}
        dataCreate={{
          identifier: employee?.identifier,
          phoneNumber: employee?.phoneNumber,
          fullName: employee?.fullName,
          role: newInfor?.role,
          email: employee?.email,
          workingPointID: newInfor?.workingPointID,
          status: newInfor?.status,
          address: {
            detail: employee?.address?.detail,
            communeID: employee?.address?.commune?.communeID,
            districtID: employee?.address?.district?.districtID,
            provinceID: employee?.address?.province?.provinceID,
          },
        }}
        idChange={employee?.employeeID}
      />
    </div>
  );
}
