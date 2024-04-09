import React, { useState } from 'react';
import { ethers } from 'ethers';
import { Form, Button, Card, Image, CardHeader, CardBody, CardFooter } from 'react-bootstrap';
import PriceFeed from './artifacts/contracts/PriceFeed.sol/PriceFeed.json';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.min.js';

function App() {
  const [storedPrice, setStoredPrice] = useState('');
  const [item, setItem] = useState({
    pairs: ''
  });
  const [clickedRadioButtonId, setClickedRadioButtonId] = useState('');

  const { pairs } = item;

  const contractAddress = '0xb87B80f96346dF4E7155BBdf205C031a70bF26cD';
  const provider = new ethers.providers.Web3Provider(window.ethereum);
  const contract = new ethers.Contract(contractAddress, PriceFeed.abi, provider);

  const getPair = async () => {
    console.log('submit id: ', clickedRadioButtonId);
    try {
      // to fix Error: sending a transaction requires a signer (operation="sendTransaction", code=UNSUPPORTED_OPERATION, version=contracts/5.7.0)
      const contractWithSigner = contract.connect(provider.getSigner());
      // retrieve current price from contract
      const contractPrice = await contractWithSigner.updatePrice(clickedRadioButtonId);
      await contractPrice.wait();
      console.log('contractPrice: ', contractPrice);
      // get latest price conversion
      const latestFetchedPrice = await contract.getLastFetchedPrice(clickedRadioButtonId);
      console.log('latestFetchedPrice: ', latestFetchedPrice);
      setStoredPrice('$' + parseInt(latestFetchedPrice) / 100000000); 
    } catch (error) {
      console.error(error);
    }
  };

  const handleChange = (e) => {
    setStoredPrice('');
    setItem((prevState) => ({
      ...prevState,
      pairs: e.target.value,
    }));

    // Get the id of the clicked radio button
    console.log('handleChange radio button: ', e.target.id);
    setClickedRadioButtonId(e.target.id);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
  };

  return (
    <div className='container-fluid mt-5'>
      <div className='d-flex justify-content-center align-items-center'>
        <Card  className='mt-2 shadow bg-body rounded' style={{ width: '32rem' }}>
          <CardHeader as='h5' className='text-center'>
            <Image src='https://seeklogo.com/images/C/chainlink-logo-B072B6B9FE-seeklogo.com.png' width={170} height={55} fluid className='mt-5' />
            <hr></hr>
            Conversion Pair
          </CardHeader>
          <CardBody>
            <div className='d-flex justify-content-center'>
              <form onSubmit={handleSubmit}>
                <Form.Group controlId='pairs'>
                  <Form.Check
                    id='1'
                    value='BTC/USD'
                    type='radio'
                    aria-label='radio 1'
                    label='BTC/USD'
                    onChange={handleChange}
                    checked={pairs === 'BTC/USD'}
                  />
                  <Form.Check
                    id='2'
                    value='ETH/USD'
                    type='radio'
                    aria-label='radio 2'
                    label='ETH/USD'
                    onChange={handleChange}
                    checked={pairs === 'ETH/USD'}
                  />
                  <Form.Check
                    id='3'
                    value='LINK/USD'
                    type='radio'
                    aria-label='radio 3'
                    label='LINK/USD'
                    onChange={handleChange}
                    checked={pairs === 'LINK/USD'}
                  />
                  <Form.Check
                    id='4'
                    value='BTC/ETH'
                    type='radio'
                    aria-label='radio 4'
                    label='BTC/ETH'
                    onChange={handleChange}
                    checked={pairs === 'BTC/ETH'}
                  />
                </Form.Group>
              </form>
            </div>
            <div className='mt-4 d-flex justify-content-center'>
              <Button variant='outline-primary' size='sm' type='submit' onClick={getPair}>
                Submit
              </Button>
            </div>
          </CardBody>
          <CardFooter>
          {storedPrice !== '' ? (
            <div className='d-flex justify-content-center'>
              <h5>{pairs} ➡ {storedPrice}</h5>
            </div>
            ) : (
              <div style={{ height: '20px' }}></div>
            )}
          </CardFooter>
        </Card>
      </div> 
    </div>
  );
}

export default App;