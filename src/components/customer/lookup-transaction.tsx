import { useState } from 'react';
import { Button, Container, Row, Col, Form } from 'react-bootstrap';
import useSWR from 'swr';

/**
 * React component for looking up transactions based on location.
 *
 * This component allows users to select a province, district, and commune to
 * filter and display relevant transactions. It provides a map showing the selected
 * area and triggers the display of a TransactionList component when the user clicks
 * the "TRA CỨU" (Search) button.
 *
 * @returns {JSX.Element} - The rendered React element for the LookUpTransaction component.
 */
export default function LookUpTransaction() {
  const { data: provinceData } = useSWR('https://magicpost-uet.onrender.com/api/administrative/province/getall', {
    revalidateIfStale: false,
    revalidateOnFocus: false,
    revalidateOnReconnect: false,
  });

  const [selectedProvince, setSelectedProvince] = useState();

  const { data: districtData } = useSWR(
    `https://magicpost-uet.onrender.com/api/administrative/district/getall/${selectedProvince}`,
    {
      revalidateIfStale: false,
      revalidateOnFocus: false,
      revalidateOnReconnect: false,
    }
  );

  const [selectedDistrict, setSelectedDistrict] = useState();
  const { data: communeData } = useSWR(
    `https://magicpost-uet.onrender.com/api/administrative/commune/getall/${selectedDistrict}`,
    {
      revalidateIfStale: false,
      revalidateOnFocus: false,
      revalidateOnReconnect: false,
    }
  );

  const [selectedCommune, setSelectedCommune] = useState('');

  const [showTransactionList, setShowTransactionList] = useState(false);
  return (
    <div>
      <Container className="lookUpContainer">
        <Row>
          <Col xs="12" md="6" className="mt-2">
            <Form>
              <Row>
                <Form.Select aria-label="Chọn Tỉnh/ TP" className="selectContainer" onChange={(e) => {}} required>
                  <option value={0}>Chọn Tỉnh/ TP</option>
                  {/* {provinceData?.map((province) => (
                    <option key={province.provinceID} value={province.provinceID}>
                      {province.name}
                    </option>
                  ))} */}
                </Form.Select>

                <Form.Select onChange={(e) => {}} required className="selectContainer">
                  <option value={0}>Chọn Quận/Huyện</option>
                  {/* {districtData?.map((district) => (
                    <option key={district.districtID} value={district.districtID}>
                      {district.name}
                    </option>
                  ))} */}
                </Form.Select>

                <Form.Select
                  aria-label="Chọn Xã/ Phường"
                  className="selectContainer"
                  onChange={(e) => {
                    setSelectedCommune(e.target.value);
                  }}
                  required
                >
                  <option value={0}>Chọn Xã/Phường</option>
                  {/* {communeData?.map((commune) => (
                    <option key={commune.communeID} value={commune.communeID}>
                      {commune.name}
                    </option>
                  ))} */}
                </Form.Select>

                <Button
                  className="submitButton"
                  onClick={() => {
                    setShowTransactionList(true);
                  }}
                >
                  TRA CỨU
                </Button>
              </Row>
            </Form>
          </Col>

          <Col className="mapContainer mt-2" md="6" xs="12">
            <iframe
              src="https://www.google.com/maps/d/u/0/embed?mid=1VCEMjR_Ldo68vk5FiAWGf_7oV5r9PE8&ehbc=2E312F"
              width="630"
              height="350"
              className="map"
            ></iframe>
          </Col>
        </Row>
      </Container>
      {/* {showTransactionList && (
        <TransactionList provinceID={selectedProvince} districtID={selectedDistrict} communeID={selectedCommune} />
      )} */}
    </div>
  );
}
