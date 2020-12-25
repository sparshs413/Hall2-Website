import React, { Component } from 'react'
import "./EditAccounts.css";
import { Table, Spinner, Modal } from 'react-bootstrap';
import {Container, Loader, Button, Icon, Input, Dropdown } from 'semantic-ui-react';



class FormTimeTable extends Component {
  constructor(props) {
    super(props);
    this.state = { 
      users: [{user1:{isAdmin:true, isMessAdmin: false},'user2':{isAdmin:true, isMessAdmin: true}, 
                'user3':{isAdmin:false, isMessAdmin: true}, 'user4':{isAdmin:false, isMessAdmin: false},
                'user5':{isAdmin:false, isMessAdmin: false}, }],
      admin_users:[{'user1':{isAdmin:true, isMessAdmin: false},'user2':{isAdmin:true, isMessAdmin: true}, 
                  'user3':{isAdmin:false, isMessAdmin: true},  }],

      add_admin_email:'',
      add_admin_isAdmin: true,
      add_admin_isMessAdmin: false,
      isLoading: true,
      smShow: false,
      error:'',

    }
    this.handleSubmit = this.handleSubmit.bind(this);
    this.addClick = this.addClick.bind(this);
  }


  componentDidMount() {
    this.setState({isLoading: true});
    this.setState({isLoading: false});

  }

  handleClose = () => {
    this.setState({ smShow: false });
  };

  handleChange = (e) => {
    var email = e.target.value;
    this.setState({ add_admin_email: email });
  }

  checkBoxChange = (e) => {
    this.setState({ [e.target.name]: !this.state.[e.target.name] });
  }

  already_admin_change = (e, key, type) => {
    var admin_users = {...this.state.admin_users};
    admin_users[0][key][type] = !admin_users[0][key][type];
    this.setState({ admin_users });
  }

  addClick(){
    var users = {...this.state.users};
    var admin_users = {...this.state.admin_users};
  
    if(this.state.add_admin_email in users[0]){

      if(this.state.add_admin_isAdmin || this.state.add_admin_isMessAdmin){
        admin_users[0][this.state.add_admin_email] = {
          isAdmin:this.state.add_admin_isAdmin, 
          isMessAdmin: this.state.add_admin_isMessAdmin}

        this.setState({admin_users, add_admin_email:'', error:''})
      }
      else{
        this.setState({error: 'Tick atleast one checkbox'})
      }
      
    }
    else{
      this.setState({error: 'Input user is not registered'})
      if(this.state.add_admin_email === ''){
        this.setState({error: 'Add email'})
      }
    }
  }

  handleSubmit(event) {
    event.preventDefault();
    var admin_users = {...this.state.admin_users};

    console.log(admin_users)
    this.setState({smShow:true});
    setTimeout(()=>this.setState({smShow:false}), 1300);
  }


  render(){
    var admin_users = {...this.state.admin_users};

    return (
    <div className='EditAcc'>
    <Container className='timetable timetableform ' text>

      <h3>Edit accounts permissions
      <Button primary floated='right' className='submit_menu' onClick={this.handleSubmit}>
        Submit
      </Button>
      </h3>
      <Table responsive striped bordered hover className='form'>
        <thead>
          <tr>
              <th>Email</th>
              <th>Admin</th>
              <th>Mess Admin</th>
          </tr>
        </thead>
        <tbody>

        {this.state.isLoading ?
          <div className='loader_center'>
            <Spinner animation="border" variant="info" />
          </div>    
        :
        <>

        {Object.keys(admin_users[0]).map((key, value) => { 
        return (
          <tr>
            <td>{key}</td>
              <td>
              <form>
              <input
                checked={admin_users[0][key]['isAdmin']}
                onChange={e=>this.already_admin_change(e, key, 'isAdmin')}
                type='checkbox'
              />
              </form>
              </td>
              <td>
              <form>
              <input
                checked={admin_users[0][key]['isMessAdmin']}
                type='checkbox' 
                onChange={e=>this.already_admin_change(e, key, 'isMessAdmin')}
                />
              </form>
              </td>
          </tr>
        )})}

          <tr>
            <td colSpan='3' className='heading'>
              <div className='heading'>Make other account admin</div>
            </td>
          </tr>
          <tr className='add_admin'>
            <td>
              <span className='label'>Existing User Email</span>
              <Input
                iconPosition='left'
                className='admin_input'
                value={this.state.add_admin_email}
                placeholder='Email'
                onChange={this.handleChange}
              />
            </td>
              <td>
              <input
                checked={this.state.add_admin_isAdmin}
                onChange={this.checkBoxChange}
                name='add_admin_isAdmin'
                type='checkbox'
              />
              </td>
              <td>
              <input
                  checked={this.state.add_admin_isMessAdmin}
                  name='add_admin_isMessAdmin'
                  onChange={this.checkBoxChange}
                  type='checkbox'
                />
              </td>
          </tr>
          </>
        }
        </tbody>

      </Table>
      <span className='error'>{this.state.error}</span>
      <input type='button' className='addbtn' value='+' onClick={this.addClick}/>
    </Container>


      <Modal
        size="sm"
        style={{backgroundColor: 'transparent'}}
        show={this.state.smShow}
        className="lf-modal"
        onHide={() => this.handleClose()}
        aria-labelledby="example-modal-sizes-title-sm"
      >
      <Modal.Header closeButton>
        <Modal.Title id="example-modal-sizes-title-sm">
          Changed Successfully
        </Modal.Title>
      </Modal.Header>
      </Modal>

    </div>
    );
  }
}


export default FormTimeTable;
