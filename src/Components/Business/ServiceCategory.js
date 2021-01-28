import React from 'react';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import {useHistory}from 'react-router-dom'
import capentary from '../../Assets/capentary.jpg'
import engineeringsvg from '../../Assets/engineeringsvg.png'
import fashionsvg from '../../Assets/fashionsvg.png'
import hairstylistsvg from '../../Assets/hairstylistsvg.png'
import healthsvg from '../../Assets/healthsvg.svg'
import housesvg from '../../Assets/housesvg.png'
import restaurantsvg from '../../Assets/restaurantsvg2.png'
import schoolsvg from '../../Assets/schoolsvg.png'
import hotelsvg from '../../Assets/hotlsvg.png'
import breakfast from '../../Assets/breakfast.png'

function ServiceCategory() {
  const history = useHistory()
  return (
          <>
            <div className='products_category' onClick={()=>history.push('/service/Housing')}>
                <img src={housesvg} alt='alt' className="products_category_icons"/>
                <div className='products_category_info'>
                    <h4><strong>Housing and Property</strong></h4>
                    <h5 >suggested for you</h5>   
                </div>
                <ChevronRightIcon className='products_category_cheveron' />         
             </div>
             <div className='products_category' onClick={()=>history.push('/service/Hospitality')}>
                  <img src={hotelsvg} alt='alt' className="products_category_icons"/>
                  <div className='products_category_info'>
                    <h4><strong>Hotels and Suites</strong></h4>
                    <h5 >suggested for you</h5>   
                </div>
                <ChevronRightIcon className='products_category_cheveron' />    
              </div>
              <div className='products_category' onClick={()=>history.push('/service/Restaurants')}>
                  <img src={restaurantsvg} alt='alt' className="products_category_icons"  />
                  <div className='products_category_info'>
                    <h4><strong>Restaurants and Eatery</strong></h4>
                    <h5 >suggested for you</h5>   
                </div>
                <ChevronRightIcon className='products_category_cheveron' />    
              </div>
              <div className='products_category' onClick={()=>history.push('/service/Schools')}>
                  <img src={schoolsvg} alt='alt' className="products_category_icons"/>
                  <div className='products_category_info'>
                    <h4><strong>Schools</strong></h4>
                    <h5 >suggested for you</h5>   
                </div>
                <ChevronRightIcon className='products_category_cheveron' />    
              </div>
              <div className='products_category'  onClick={()=>history.push('/service/Engineering')}>
                  <img src={engineeringsvg} alt='alt' className="products_category_icons"/>
                  <div className='products_category_info'>
                    <h4><strong>Engineering</strong></h4>
                    <h5 >suggested for you</h5>   
                </div>
                <ChevronRightIcon className='products_category_cheveron' />    
              </div>
              <div className='products_category' onClick={()=>history.push('/service/FashionDesign')}>
                  <img src={fashionsvg} alt='' className="products_category_icons"/>
                  <div className='products_category_info'>
                    <h4><strong>Fashion Design</strong></h4>
                    <h5 >suggested for you</h5>   
                </div>
                <ChevronRightIcon className='products_category_cheveron' />    
              </div>
              <div className='products_category' onClick={()=>history.push('/service/Health')}>
                  <img src={healthsvg} alt='alt' className="products_category_icons" />
                  <div className='products_category_info'>
                    <h4><strong>Health Services</strong></h4>
                    <h5 >suggested for you</h5>   
                </div>
                <ChevronRightIcon className='products_category_cheveron' />    
              </div>
              <div className='products_category' onClick={()=>history.push('/service/HairStylist')}>
                  <img src={hairstylistsvg} alt='alt' className="products_category_icons" />
                  <div className='products_category_info'>
                    <h4><strong>Barbing and Hair Styling</strong></h4>
                    <h5 >suggested for you</h5>   
                </div>
                <ChevronRightIcon className='products_category_cheveron' />    
              </div>
              <div className='products_category' onClick={()=>history.push('/service/Catering')}>
                  <img src={breakfast} alt='alt' className="products_category_icons" />
                  <div className='products_category_info'>
                    <h4><strong>Catering and Event Planning</strong></h4>
                    <h5 >suggested for you</h5>   
                </div>
                <ChevronRightIcon className='products_category_cheveron' />    
              </div>
              {/*
              <div className='products_category' onClick={()=>history.push('/product/SportsEquipments')}>
                  <img src='data:image/jpeg;base64,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' alt='alt' className="products_category_icons" />
                  <div className='products_category_info'>
                    <h4><strong>Welding and metal works</strong></h4>
                    <h5 >suggested for you</h5>   
                </div>
                <ChevronRightIcon className='products_category_cheveron' />    
              </div>
              */}
              <div className='products_category' onClick={()=>history.push('/service/Capentary')}>
                  <img src={capentary} alt='alt' className="products_category_icons" />
                  <div className='products_category_info'>
                    <h4><strong>Capentary and Wood work</strong></h4>
                    <h5 >suggested for you</h5>   
                </div>
                <ChevronRightIcon className='products_category_cheveron' />    
              </div>
          </>
  );
}

export default ServiceCategory;
