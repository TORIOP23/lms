import { estimateFeeForCustomer } from '@/api/action';
import { useState } from 'react';
import { Container, Form, Row, Col, Button, Table } from 'react-bootstrap';
import useSWR from 'swr';

const estimateFetchBody = {
  startProvinceID: '',
  endProvinceID: '',
  weight: 0,
};

/**
 * React component for estimating shipping costs for customers.
 *
 * This component allows customers to input information such as the starting province,
 * destination province, and weight to estimate the shipping costs. The estimated cost
 * is displayed in a table.
 *
 * @returns {JSX.Element} - The rendered React element for the EstimateCost component.
 */
export default function EstimateCost() {
  const { data: provinceData } = useSWR('https://magicpost-uet.onrender.com/api/administrative/province/getall', {
    revalidateIfStale: false,
    revalidateOnFocus: false,
    revalidateOnReconnect: false,
  });
  const [estimateCost, setEstimateCost] = useState();

  return (
    <>
      <Container className="lookUpContainer">
        <Form>
          <Row>
            <Col xs="12" md="6">
              <Form.Group>
                <Form.Label>Gửi từ (*)</Form.Label>
                <Form.Select
                  aria-label="Chọn Tỉnh/ TP"
                  required
                  onChange={(e) => {
                    estimateFetchBody.startProvinceID = e.target.value;
                  }}
                >
                  <option>Chọn Tỉnh/ TP</option>
                  {provinceData?.map((province: any) => (
                    <option key={province.provinceID} data-key={province.provinceID} value={province.provinceID}>
                      {province.name}
                    </option>
                  ))}
                </Form.Select>
              </Form.Group>
            </Col>
            <Col xs="12" md="6">
              <Form.Group>
                <Form.Label>Gửi đến (*)</Form.Label>
                <Form.Select
                  aria-label="Chọn Tỉnh/ TP"
                  required
                  onChange={(e) => {
                    estimateFetchBody.endProvinceID = e.target.value;
                  }}
                >
                  <option>Chọn Tỉnh/ TP</option>
                  {provinceData?.map((province: any) => (
                    <option key={province.provinceID} data-key={province.provinceID} value={province.provinceID}>
                      {province.name}
                    </option>
                  ))}
                </Form.Select>
              </Form.Group>
            </Col>
          </Row>
          <Row className="mt-2">
            <Col>
              <Form.Group>
                <Form.Label>Khối lượng</Form.Label>
                <Form.Control
                  type="number"
                  required
                  onChange={(e) => {
                    // estimateFetchBody.weight = e.target.value;
                  }}
                />
              </Form.Group>
            </Col>
          </Row>
          <Row>
            <Col>
              <Button
                className="submitButton"
                onClick={async () => {
                  if (
                    // parseInt(estimateFetchBody.startProvinceID) != NaN &&
                    // parseInt(estimateFetchBody.startProvinceID) != NaN &&
                    // parseFloat(estimateFetchBody.weight) != NaN
                    true
                  ) {
                    const res = await estimateFeeForCustomer(estimateFetchBody);
                    // setEstimateCost(res);
                  }
                }}
              >
                Tra cứu
              </Button>
            </Col>
          </Row>
        </Form>
      </Container>

      <Container className="lookUpContainer">
        <Table>
          <thead>
            <tr>
              <th>#</th>
              <th>Dịch vụ</th>
              <th>Thành tiền</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>1</td>
              <td>Tiêu chuẩn</td>
              {/* {<td>{estimateCost?.cost || ''}</td>} */}
            </tr>
          </tbody>
        </Table>
      </Container>
    </>
  );
}
