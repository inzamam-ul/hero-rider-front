import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { useAuth } from "../lib/auth";
import axios from "axios";
import lodinggif from "../images/Ring-Loading-1.gif";
import ImgInput from "./ImgInput";
import { Navigate } from "react-router-dom";

const SignUpForm = ({ rider }) => {
  const { loginStatus, signUpWithEmailAndPass, signInWithEmailAndPass, user } =
    useAuth();
  const {
    register,
    handleSubmit,
    getValues,
    formState: { errors },
  } = useForm();

  const [imgUploaded, setImageUploaded] = useState(null);

  const [imgUrl, setImageUrl] = useState({
    drivingLicence: "",
    nid: "",
    profile: "",
  });

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

  const [newUser, setNewUser] = useState(true);

  const onSubmit = (data) => {
    console.log(data);
    const { name, email, password } = data;
    newUser
      ? signUpWithEmailAndPass(name, email, password)
      : signInWithEmailAndPass(email, password);

    const newData = { ...data, imgUrl };
    console.log(newData);
    const url = "http://localhost:5050/addUser";

    axios.post(url, newData).then((res) => {
      console.log(res.data);

      setImageUploaded(null);
    });
  };

  if (user) return <Navigate to="/profile" />;

  return (
    <div className="sign_form mt-5">
      <form onSubmit={handleSubmit(onSubmit)}>
        <h5>{newUser ? "Create an account" : "Login"}</h5>

        <div className="container-fluid row">
          <div className="col-md-6">
            {newUser && (
              <div className="sign_input  ">
                <input
                  required
                  className="effect-24"
                  {...register("name", {
                    // pattern: /^[A-Za-z]+$/i,
                  })}
                />
                <label>Full Name</label>
                {errors?.companyName?.type === "pattern" && (
                  <p>Alphabetical characters only</p>
                )}
              </div>
            )}
            <div className="sign_input  ">
              <input
                required
                className="effect-24"
                {...register("email", {
                  required: true,
                  // maxLength: 20,
                  pattern: /^\S+@\S+\.\S+$/,
                })}
              />
              <label>Email Address</label>
              {errors?.email?.type === "required" && (
                <p>This field is required</p>
              )}
              {errors?.email?.type === "pattern" && <p>Email is not valid</p>}
            </div>

            {newUser && (
              <div className="sign_input  ">
                <input
                  type="number"
                  required
                  className="effect-24"
                  {...register("Age", {})}
                />
                <label>Age</label>
                {errors?.companyName?.type === "pattern" && (
                  <p>Alphabetical characters only</p>
                )}
              </div>
            )}

            {newUser && (
              <div className="sign_input  ">
                <input
                  required
                  className="effect-24"
                  {...register("address", {
                    // pattern: /^[A-Za-z]+$/i,
                  })}
                />
                <label>Address</label>
                {errors?.companyName?.type === "pattern" && (
                  <p>Alphabetical characters only</p>
                )}
              </div>
            )}

            {newUser && (
              <div className="sign_input  ">
                <input
                  type="tel"
                  placeholder="123-45-678"
                  required
                  className="effect-24"
                  {...register("phone", {})}
                />
                <label>Phone</label>
                {errors?.companyName?.type === "pattern" && (
                  <p>Alphabetical characters only</p>
                )}
              </div>
            )}

            {newUser && rider && (
              <div className="sign_input  ">
                <input
                  required
                  className="effect-24"
                  {...register("area", {})}
                />
                <label>Area</label>
                {errors?.companyName?.type === "pattern" && (
                  <p>Alphabetical characters only</p>
                )}
              </div>
            )}
            {newUser && (
              <div className="sign_input">
                <select {...register("vehicleType")}>
                  <option value="Car">Car</option>
                  <option value="Bike">Bike</option>
                </select>
                <label>Vehicle Type</label>
                {errors?.gender?.type === "pattern" && (
                  <p>Alphabetical characters only</p>
                )}
              </div>
            )}

            {newUser && rider && (
              <div className="sign_input  ">
                <input
                  required
                  className="effect-24"
                  {...register("vehicleName", {})}
                />
                <label>Vehicle Name</label>
                {errors?.companyName?.type === "pattern" && (
                  <p>Alphabetical characters only</p>
                )}
              </div>
            )}
          </div>

          <div className="col-md-6">
            {newUser && rider && (
              <div className="sign_input  ">
                <input
                  required
                  className="effect-24"
                  {...register("vehicleModel", {})}
                />
                <label>Vehicle Model</label>
                {errors?.companyName?.type === "pattern" && (
                  <p>Alphabetical characters only</p>
                )}
              </div>
            )}
            {newUser && rider && (
              <div className="sign_input  ">
                <input
                  required
                  className="effect-24"
                  {...register("namePlate", {})}
                />
                <label>Name Plate</label>
                {errors?.companyName?.type === "pattern" && (
                  <p>Alphabetical characters only</p>
                )}
              </div>
            )}
            {rider && (
              <ImgInput
                imgUrl={imgUrl}
                setImageUrl={setImageUrl}
                entity="drivingLicence"
              />
            )}
            <ImgInput imgUrl={imgUrl} setImageUrl={setImageUrl} entity="nid" />
            <ImgInput
              imgUrl={imgUrl}
              setImageUrl={setImageUrl}
              entity="profile"
            />

            <div className="sign_input  ">
              <input
                required
                className="effect-24"
                type="password"
                {...register("password", {
                  required: "Password is required!",
                })}
              />
              <label>Password </label>
              {errors.password && (
                <p style={{ color: "white" }}>{errors.password.message}</p>
              )}
            </div>
            {newUser && (
              <div className="sign_input  ">
                <input
                  required
                  type="password"
                  className="effect-24"
                  {...register("passwordConfirmation", {
                    required: "Please confirm password!",
                    validate: {
                      matchesPreviousPassword: (value) => {
                        const { password } = getValues();
                        return password === value || "Passwords didn't match!";
                      },
                    },
                  })}
                />
                <label>Confirm Password </label>
                {errors.passwordConfirmation && (
                  <p style={{ color: "white" }}>
                    {errors.passwordConfirmation.message}
                  </p>
                )}
              </div>
            )}
            <div className="sign_input  ">
              <input
                type="submit"
                value={newUser ? "Create account" : "Login"}
              />
            </div>
          </div>
        </div>
        {loginStatus.error !== "" && (
          <p style={{ color: "red", textAlign: "center" }}>
            {loginStatus.error}
          </p>
        )}
      </form>
    </div>
  );
};

export default SignUpForm;
