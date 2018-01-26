import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Container, Card, CardTitle, CardSubtitle, CardText, Button, CardHeader, CardBody, Row, Col } from 'reactstrap';
import PropTypes from 'prop-types';

import Nav from '../../components/Nav';
import JobModal from '../../modals/Job';
import API from '../../utils/API';

import { showModal, hideModal } from '../../actions';

import './Jobs.css';

class Jobs extends Component {
  static propTypes = {
    auth: PropTypes.object.isRequired,
    modal: PropTypes.object.isRequired,
    showModal: PropTypes.func.isRequired,
    hideModal: PropTypes.func.isRequired,
  }

  state = {
    status: 'loading',
    jobs: [],
    message: '',
  }

  componentDidMount() {
    this.loadJobs();
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.modal.status === 'success') {
      this.loadJobs();
    }
  }

  onEdit = (job) => {
    this.props.showModal({ type: 'editJob', job });
  }

  loadJobs = () => {
    API.getJobs()
      .then((res) => {
        this.setState({
          status: 'idle',
          jobs: res.data.jobs,
        });
        this.props.hideModal();
      }).catch((err) => {
        this.setState({
          status: 'error',
          message: err.errorMessage,
        });
      });
  }

  render() {
    const { jobs, status, message } = this.state;
    const { id } = this.props.auth;

    return (
      <div className="full-content">
        <Nav />
        <JobModal />
        <Container className="jobPanel p-3 my-4">
          <h1 className="text-center p-3" >Your Jobs are here.</h1>
          {
            status === 'error' &&
            <p>{message}</p>
          }
          {
            jobs.map(job => (
              <Card key={Math.random()} className="my-2">
                <CardHeader>
                  <Row>
                    <Col>
                      <CardTitle>{job.title}</CardTitle>
                      <CardSubtitle>{job.company}</CardSubtitle>
                    </Col>
                    {
                      job.uid === id &&
                      <Col className="ml-auto">
                        <Row className="h-100 justify-content-end align-items-center">
                          <Button
                            className="mx-2"
                            color="warning"
                            onClick={() => this.onEdit(job)}
                            disabled={status === 'saving'}
                          >
                            Edit
                          </Button>
                          <Button
                            className="mx-2"
                            color="danger"
                            onClick={this.onRemove}
                            disabled={status === 'saving'}
                          >
                            Remove
                          </Button>
                        </Row>
                      </Col>
                    }
                  </Row>
                </CardHeader>
                <CardBody>
                  <CardText>{job.notes}</CardText>
                </CardBody>
              </Card>
            ))
          }
        </Container>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  auth: state.auth,
  modal: state.modal,
});

const mapDispatchToProps = dispatch => bindActionCreators({
  showModal,
  hideModal,
}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(Jobs);
