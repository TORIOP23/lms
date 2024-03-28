'use client';
import 'bootstrap/js/src/dropdown.js';
import { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import BreadCrumb from './breadcrumd';
import { signOut, useSession } from 'next-auth/react';
import { FaUserCircle } from 'react-icons/fa';
import { Container, Row, Col, Button, Image } from 'react-bootstrap';
import { useRouter } from 'next/navigation';
import '@/css/employee/topbar.css';

const itemVariants = {
  open: {
    opacity: 1,
    y: 0,
    transition: { type: 'spring', stiffness: 300, damping: 24 },
  },
  closed: { opacity: 0, y: 20, transition: { duration: 0.2 } },
};
function useOutsideAlerter(ref: any) {
  useEffect(() => {
    /**
     * Alert if clicked on outside of element
     */
    function handleClickOutside(event: any) {
      if (ref.current && !ref.current.contains(event.target)) {
        alert('You clicked outside of me!');
      }
    }
    // Bind the event listener
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      // Unbind the event listener on clean up
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [ref]);
}
export default function TopBar() {
  const route = useRouter();
  const [profile, setProfile] = useState(true);
  const profileRef = useRef();
  const userName = useSession().data?.user?.name;
  useEffect(() => {
    const closeProfile = (e: any) => {
      setProfile(false);
      console.log(1);
    };
    if (profile) {
      document.body.addEventListener('click', closeProfile);
    } else document.body.removeEventListener('click', closeProfile);
    return () => document.body.removeEventListener('click', closeProfile);
  }, [profile]);
  return (
    <motion.nav layout className="nav topbar">
      <Container className="navBar">
        <Row className="breadCrumbContainer">
          <BreadCrumb />
        </Row>

        <Row>
          <Col xs="auto" className="avatarContainer">
            <motion.nav layout initial={false} animate={profile ? 'open' : 'closed'}>
              <Container
                onClick={() => {
                  console.log(profile);
                  setProfile(!profile);
                }}
              >
                <Row className="usernameContainer">
                  <Col xs="auto" className="userName">
                    {userName || 'User'}
                  </Col>
                  <Col xs="auto">
                    <FaUserCircle size={'2em'} />
                  </Col>
                </Row>
              </Container>
              <motion.ul
                className="list-infor"
                variants={{
                  open: {
                    clipPath: 'inset(0% 0% 0% 0% round 10px)',
                    transition: {
                      type: 'spring',
                      bounce: 0,
                      duration: 0.7,
                      delayChildren: 0.3,
                      staggerChildren: 0.05,
                    },
                    display: 'inline',
                  },
                  closed: {
                    clipPath: 'inset(10% 5% 90% 5% round 10px)',
                    transition: {
                      type: 'spring',
                      bounce: 0,
                      duration: 0.3,
                      display: 'inline',
                    },
                    display: 'none',
                  },
                }}
                style={{ pointerEvents: profile ? 'auto' : 'none' }}
              >
                <motion.li
                  className="acc-list"
                  variants={itemVariants}
                  onClick={() => {
                    setProfile(!profile);
                    route.push('/employees/information');
                  }}
                >
                  Thông tin cá nhân
                </motion.li>
                <motion.li className="acc-list" variants={itemVariants} onClick={() => signOut()}>
                  Đăng xuất
                </motion.li>
              </motion.ul>
            </motion.nav>
          </Col>
        </Row>
      </Container>
    </motion.nav>
  );
}
