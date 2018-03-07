pragma solidity ^0.4.0;


contract InvoiceManager {
    address public manager;

    function InvoiceManager() public {
        manager = msg.sender;
    }

    struct Invoice {
        string title;
        uint value;
        bool isPaid;
    }

    Invoice[] public invoices;

    function createInvoice(string title, uint value ) public {
        Invoice memory newInvoice = Invoice({
            title: title,
            value:value,
            isPaid:false
        });
        invoices.push(newInvoice);
    }

    function setInvoicePaid(uint index) public {
        require(invoices.length > index);
        invoices[index].isPaid = true;
    }

    function getInvoicesCount()
    public
    constant
    returns ( uint )
    {
        return invoices.length;
    }
}
