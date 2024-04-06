import React, { useState, useEffect } from 'react';
import ReactMarkdown from 'react-markdown';
import { Container, Col, Row } from 'react-bootstrap';
import PropTypes from 'prop-types';
import Fade from 'react-reveal';
import Header from './Header';
import endpoints from '../constants/endpoints';
import FallbackSpinner from './FallbackSpinner';

const styles = {
  introTextContainer: {
    margin: 10,
    flexDirection: 'column',
    whiteSpace: 'pre-wrap',
    textAlign: 'left',
    fontSize: '1.2em',
    fontWeight: 500,
  },
  introImageContainer: {
    margin: 10,
    justifyContent: 'center',
    alignItems: 'center',
    display: 'flex',
  },
  introImage: {
    justifyContent: 'center',
    alignItems: 'center',
    display: 'flex',
  },
  introImage1: {
    justifyContent: 'center',
    alignItems: 'center',
    display: 'flex',
    fontSize: '1.2em',
    fontWeight: 500,
  },
  introImage2: {
    justifyContent: 'center',
    alignItems: 'center',
    display: 'flex',
    fontSize: '1.2em',
    fontWeight: 500,
  },
  introImage3: {
    justifyContent: 'center',
    alignItems: 'center',
    display: 'flex',
    fontSize: '1.2em',
    fontWeight: 500,
  },
};

function About(props) {
  const { header } = props;
  const [data, setData] = useState(null);

  const parseIntro = (text) => (
    <ReactMarkdown
      children={text}
    />
  );

  useEffect(() => {
    fetch(endpoints.about, {
      method: 'GET',
    })
      .then((res) => res.json())
      .then((res) => setData(res))
      .catch((err) => err);
  }, []);
  return (
    <>
      <Header title={header} />
      <div className="section-content-container">
        <Container>
          {data
            ? (
              <Fade>
                <Row>
                  <Col style={styles.introTextContainer}>
                    {parseIntro(data.about)}
                  </Col>
                  <center>
                    <Row style={styles.introImage}>
                      <h1>{parseIntro(data.title)}</h1>
                    </Row>
                    <Row style={styles.introImage1}>
                      {parseIntro(data.title1)}
                    </Row>
                    <Row style={styles.introImage2}>
                      {parseIntro(data.title2)}
                    </Row>
                    <Row style={styles.introImage3}>
                      <a href="https://www.taapowerlifting.com/">
                        https://www.taapowerlifting.com/
                      </a>
                    </Row>
                  </center>
                  <Col style={styles.introImageContainer}>
                    <img src={data?.imageSource} alt="profile" />
                  </Col>
                </Row>
              </Fade>
            )
            : <FallbackSpinner />}
        </Container>
      </div>
    </>
  );
}

About.propTypes = {
  header: PropTypes.string.isRequired,
};

export default About;
