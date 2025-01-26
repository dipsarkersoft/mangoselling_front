import axios from "axios";
import { useAuth } from "../context/useAuth.jsx";

export const URL = "https://mangosellingbackend.onrender.com/";

export const RegisterAPI = async (
  username,
  firstName,
  lastName,
  email,
  password,
  mobile
) => {
  try {
    const { data } = await axios.post(
      `${URL}register/`,
      {
        username: username,
        first_name: firstName,
        last_name: lastName,
        email: email,
        password: password,
        confirm_password: password,
        mobile_no: mobile,
      },
      {
        headers: {
          "Content-Type": "application/json",
        },
        withCredentials: true,
      }
    );

    return data;
  } catch (error) {
    return false;
  }
};


export const imageUpload= async(data)=>{
  
  const IMAGEUPLAPIURL="https://api.imgbb.com/1/upload?key=6cd84806ff8cfdcea74fc868284dcb50"

    try {
      const res = await axios.post(IMAGEUPLAPIURL, data, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      return res
      
    } 

    catch (error) {
      console.error("Error uploading image:",  error.message);
    }
    
}

export const loginAPI = async (username, password) => {
  try {
    const { data } = await axios.post(`${URL}login/`, {
      username,
      password,
    });

    return data;
  } catch (error) {
    // console.error("Login failed:", error);
    return false;
  }
};

export const logoutAPI = async (token) => {
  // const {token} =useAuth()
  
  const { data } = await axios.get(`${URL}logout/`, {
    headers: {
      Authorization: `Token ${token}`,
      "Content-Type": "application/json",
    },
  });
 
  return data;
};

export const authenticated_user = async (id, token) => {
  const { data } = await axios.get(`${URL}userID/${id}/`, {
    headers: {
      Authorization: `Token ${token}`,
      "Content-Type": "application/json",
    },
  });
  return data;
};

export const allCategory = async () => {
  const { data } = await axios.get(`${URL}categories/all/`);
  return data;
};

export const getCategoryByid=async(id)=>{

  const { data } = await axios.get(`${URL}/categories/${id}/`);
  return data;

}

export const allProducts = async (id) => {
  const url = id ? `${URL}mango/all/?cat_id=${id}` : `${URL}mango/all/?cat_id=`;
  const { data } = await axios.get(url);
  return data;
};
export const mangoDetailsAPI = async (id) => {
  const { data } = await axios.get(`${URL}mango/${id}/`);
  return data;
};

// order start

export const createOrder = async (token, body) => {
  try {
    // console.log(body)
    const { data } = await axios.post(
      `${URL}order/create/`,

      body,
      {
        headers: {
          Authorization: `Token ${token}`,
          "Content-Type": "application/json",
        },
      }
    );
    return data;
  } catch (err) {
    // console.log(err);
  }
};



export const paymentAPI=async(token,body)=>{

  // console.log(body)
  const {data}=await axios.post(`${URL}order/payment/`,body,
    {
      headers: {
        Authorization: `Token ${token}`,
        "Content-Type": "application/json",
      },
    }
  )
  return data

}


export const sessionKeyAPI=async(token,id)=>{

  // console.log(body)
  const {data}=await axios.post(`${URL}order/payment/sucess`,id,
    {
      headers: {
        Authorization: `Token ${token}`,
        "Content-Type": "application/json",
      },
    }
  )
  return data

}


export const allorderView = async (token) => {
  const { data } = await axios.get(`${URL}order/all/`, {
    headers: {
      Authorization: `Token ${token}`,
      "Content-Type": "application/json",
    },
  });
  return data;
};

export const orderStatusUpdate = async (currentOrder,token,selectedStatus) => {
  
  const { quantity, mango, id } = currentOrder;

    const sendData = {
      quantity: quantity,
      mango: mango,
      delivery_status: selectedStatus,
    };

    

      const BaseUrl = `${URL}order/update/${id}`;
     
      const headers = {
        Authorization: `Token ${token}`,
        "Content-Type": "application/json",
      };

      if (selectedStatus == "Delete") {

       const {data} = await axios.delete(BaseUrl, { headers });

       return data
      }
      else
       {
      const  {data} = await axios.put(BaseUrl, sendData, { headers });
      return data
      }

 
};

// review start

export const createReview=async(token,body)=>{

  try {
    
    const { data } = await axios.post(
      `${URL}order/review/`,

      body,
      {
        headers: {
          Authorization: `Token ${token}`,
          "Content-Type": "application/json",
        },
      }
    );
    return data;
  } 
  
  catch (err) {
    // console.log(err);
  }


}

export const reviewByManId = async (id) => {
  const { data } = await axios.get(`${URL}order/review/list/?mango=${id}`);
  return data;
};



// mango create




export const createProduct = async (token, body) => {
  try {
    // console.log(body)
    const { data } = await axios.post(
      `${URL}mango/mangoCreate/`,

      body,
      {
        headers: {
          Authorization: `Token ${token}`,
          "Content-Type": "application/json",
        },
      }
    );
    return data;
  } catch (err) {
    // console.log(err);
  }
};