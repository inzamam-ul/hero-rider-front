import React, { useState } from "react";
import axios from "axios";
import lodinggif from "../images/Ring-Loading-1.gif";

const ImgInput = ({ imgUrl, setImageUrl, entity }) => {
  const [imgUploaded, setImageUploaded] = useState(null);

  const handleImageUpload = (entity, event) => {
    console.log(event.target.files, entity);
    const imageData = new FormData();
    imageData.set("key", "eb6147fa916a481c3d9f2b59dab1909f");
    imageData.append("image", event.target.files[0]);
    setImageUploaded("loading");
    axios
      .post("https://api.imgbb.com/1/upload", imageData)
      .then(function (response) {
        console.log(entity);
        // newImgData = { ...imgUrl, entity: response.data.data.display_url };
        if (entity == "drivingLicence") {
          setImageUrl({
            ...imgUrl,
            drivingLicence: response.data.data.display_url,
          });
        } else if (entity == "nid") {
          setImageUrl({ ...imgUrl, nid: response.data.data.display_url });
        } else if (entity == "profile") {
          setImageUrl({ ...imgUrl, profile: response.data.data.display_url });
        }
        setImageUploaded(true);
        this.form.reset();
      })
      .catch(function (error) {
        console.log(error);
      });
  };
  return (
    <div className="sign_input col-3">
      <div>
        <input onChange={(e) => handleImageUpload(entity, e)} type="file" />
        {imgUploaded === true && <span>✔️</span>}
        {imgUploaded === "loading" && (
          <img style={{ width: 30 }} src={lodinggif} alt="/" />
        )}
      </div>

      <label>Profile Picture</label>
    </div>
  );
};

export default ImgInput;
