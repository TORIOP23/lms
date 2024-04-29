'use client';

import { useRef, useState } from 'react';
import { motion } from 'framer-motion';
import BreadCrumb from './breadcrumb';
import { FaUserCircle } from 'react-icons/fa';
import { Container, Row, Col } from 'react-bootstrap';
import { useRouter } from 'next/navigation';
import authApiRequest from '@/api/auth';
import { useAppContext } from '@/app/app-provider';
import '@/css/dashboard/topbar.css';

const itemVariants = {
  open: {
    opacity: 1,
    y: 0,
    transition: { type: 'spring', stiffness: 300, damping: 24 },
  },
  closed: { opacity: 0, y: 20, transition: { duration: 0.2 } },
};

export default function TopBar() {
  const [profile, setProfile] = useState(false);
  const profileRef = useRef(null);
  const { user, setUser } = useAppContext();
  const userName = user?.name;
  const router = useRouter();

  const closeProfile = () => {
    if (!profile) {
      setProfile(false);
    }
  };

  // useEffect(() => {
  //   document.body.addEventListener('click', closeProfile);
  //   return () => document.body.removeEventListener('click', closeProfile);
  // }, []);

  const handleLogout = async () => {
    try {
      await authApiRequest.logoutFromNextClientToNextServer();
      router.push('/login');
    } catch (error) {
      console.log(error);
      // authApiRequest.logoutFromNextClientToNextServer(true).then((res) => {
      //   router.push(`/login?redirectFrom=${pathname}`);
      // });
    } finally {
      setUser(null);
      router.refresh();
      localStorage.removeItem('token');
    }
  };

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
                ref={profileRef}
                onClick={() => {
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
                      // type: 'spring',
                      bounce: 0,
                      duration: 0.5,
                      delayChildren: 0.3,
                      staggerChildren: 0.05,
                    },
                    display: 'inline',
                  },
                  closed: {
                    clipPath: 'inset(10% 5% 90% 5% round 10px)',
                    transition: {
                      // type: 'spring',
                      bounce: 0,
                      duration: 0.2,
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
                  onClick={(e) => {
                    closeProfile();
                    router.push('/dashboard/information');
                  }}
                >
                  Thông tin cá nhân
                </motion.li>
                <motion.li className="acc-list" variants={itemVariants} onClick={handleLogout}>
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
