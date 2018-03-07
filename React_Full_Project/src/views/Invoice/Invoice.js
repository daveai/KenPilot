import React, {Component} from 'react';
import {
  Badge,
  Row,
  Col,
  Card,
  CardHeader,
  CardBody,
  Table,
  Pagination,
  PaginationItem,
  PaginationLink
} from 'reactstrap';
import invoiceContract from '../../../eth/invoice'
const Web3 = require('web3');
const web3 = new Web3(new Web3.providers.HttpProvider("http://localhost:8545"));

export default class Invoice extends Component {
  constructor(props){
    super(props);
    this.invoices = [];
    this.state = {
      count:0,
      invoices:[]
    }
  }

  componentDidMount() {
    const manager = invoiceContract.methods.getInvoicesCount().call({from:'0x3f7029db78E570333D91bA640dC8A9091FcEA7EB'}).then(
      (result) => {
        if (result != 0) {
          for (let i = 0; i < result; i++){
            const invoicePromise = invoiceContract.methods.invoices(i).call({from:'0x3f7029db78E570333D91bA640dC8A9091FcEA7EB'}).then(
              (invoice) => {
                this.invoices.push(invoice);
                this.setState({invoices:this.invoices});
              }
            )
          }
        }
      }
    )
  }

  render(){

    return(
      <div className="animated fadeIn">
        <Row>
          <Col xs="12" lg="6">
            <Card>
              <CardHeader>
                <i className="fa fa-align-justify"></i> Simple Table
              </CardHeader>
              <CardBody>
                <Table responsive>
                  <thead>
                  <tr>
                    <th>Username</th>
                    <th>Date registered</th>
                    <th>Role</th>
                    <th>Status</th>
                  </tr>
                  </thead>
                  <tbody>
                  {
                    this.state.invoices.map((elem,index) => {
                      return(
                        <tr key={index}>
                          <td>{elem.title}</td>
                          <td>2012/01/01</td>
                          <td>Member</td>
                          <td>
                            {elem.isPaid == true ? (
                              <Badge color="success">Paid</Badge>
                            ) : (
                              <Badge color="danger">Not Paid</Badge>
                            )}

                          </td>
                        </tr>
                      )
                    })
                  }
                  </tbody>
                </Table>
                <Pagination>
                  <PaginationItem>
                    <PaginationLink previous href="#"></PaginationLink>
                  </PaginationItem>
                  <PaginationItem active>
                    <PaginationLink href="#">1</PaginationLink>
                  </PaginationItem>
                  <PaginationItem>
                    <PaginationLink href="#">2</PaginationLink>
                  </PaginationItem>
                  <PaginationItem>
                    <PaginationLink href="#">3</PaginationLink>
                  </PaginationItem>
                  <PaginationItem>
                    <PaginationLink href="#">4</PaginationLink>
                  </PaginationItem>
                  <PaginationItem>
                    <PaginationLink next href="#"></PaginationLink>
                  </PaginationItem>
                </Pagination>
              </CardBody>
            </Card>
          </Col>
        </Row>
      </div>
    )
  }
}
