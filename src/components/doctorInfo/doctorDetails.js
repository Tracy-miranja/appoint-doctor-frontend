// import React, { useEffect } from 'react';
// import { useParams, useNavigate } from 'react-router-dom';
// import { useDispatch, useSelector } from 'react-redux';
// import { fetchDoctors } from '../../features/doctorSlice';
// import NavBar from '../navbar/NavBar';

// function getDoctorByIndex(doctors, index) {
//   if (index >= 0 && index < doctors.length) {
//     return doctors[index];
//   }
//   return null;
// }

// function DoctorDetails() {
//   const { id } = useParams();
//   const dispatch = useDispatch();
//   const { status, error, doctors } = useSelector((state) => state.doctors);
//   const navigate = useNavigate();

//   useEffect(() => {
//     dispatch(fetchDoctors());
//   }, [dispatch]);

//   //   const doctor = doctors.find((doctor) => doctor.id == id);
//   const doctorIndex = doctors.findIndex((doctor) => doctor.id == id);
//   const doctor = doctors[doctorIndex];

//   if (status === 'loading') {
//     return <div>Loading...</div>;
//   }

//   if (status === 'failed') {
//     return (
//       <div>
//         Error:
//         {error}
//       </div>
//     );
//   }

//   const handlePrevDoctor = () => {
//     const prevDoctorId = parseInt(doctorIndex, 10) - 1;
//     const hasPrevDoctor = getDoctorByIndex(doctors, prevDoctorId);
//     if (hasPrevDoctor) {
//       navigate(`/doctors/${hasPrevDoctor?.id || ''}`);
//     }
//   };

//   const handleNextDoctor = () => {
//     const NextDoctorId = parseInt(doctorIndex, 10) + 1;
//     const hasNextDoctor = getDoctorByIndex(doctors, NextDoctorId);
//     if (hasNextDoctor) {
//       navigate(`/doctors/${hasNextDoctor?.id || ''}`);
//     }
//   };

//   return (
//     <div className="container-fluid">
//       <div className="row">
//         <div className="col-lg-2 col-md-2 col-12 d-flex flex-column justify-content custom_nav">
//           <NavBar />
//         </div>
//         <div className="col-lg-10 col-md-10 col-12 p-0">
//             <div className="col-md-2" />
//             <div className="col-12 col-md-5 p-2 overflow-hidden">
//               <button
//                 type="button"
//                 className="btn btn-primary rounded-end-pill previd"
//                 onClick={handlePrevDoctor}
//                 disabled={!doctor || parseInt(id, 10) <= 1}
//               >
//                 Prev
//               </button>
//               <img
//                 src={doctor?.photo || ''}
//                 alt={doctor?.name || ''}
//                 className="img-fluid doctor-photo"
//                 style={{ height: '500px', width: '500px' }}
//               />
//             </div>
//             <div className="col-12 col-md-5">
//               <h1>{doctor?.name || ''}</h1>
//               <p>
//                 <strong>Email: </strong>
//                 {doctor?.email || ''}
//               </p>
//               <p>
//                 <strong>Specialization: </strong>
//                 {doctor?.specialization || ''}
//               </p>
//               <p>
//                 <strong>Qualification: </strong>
//                 {doctor?.qualification || ''}
//               </p>
//               <p>
//                 <strong>Age: </strong>
//                 {doctor?.age || ''}
//               </p>
//             </div>
//           </div>
//         </div>
//       </div>
//       <button
//         type="button"
//         className="carousel-btn next btn btn-primary rounded-start-pill"
//         onClick={handleNextDoctor}
//       >
//         Next
//       </button>
//     </div>
//   );
// }

// export default DoctorDetails;

import React, { useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { fetchDoctors } from '../../features/doctorSlice';
import NavBar from '../navbar/NavBar';

function getDoctorByIndex(doctors, index) {
  if (index >= 0 && index < doctors.length) {
    return doctors[index];
  }
  return null;
}

function DoctorDetails() {
  const { id } = useParams();
  const dispatch = useDispatch();
  const { status, error, doctors } = useSelector((state) => state.doctors);
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(fetchDoctors());
  }, [dispatch]);

  const doctorIndex = doctors.findIndex((doctor) => doctor.id == id);
  const doctor = doctors[doctorIndex];

  if (status === 'loading') {
    return <div>Loading...</div>;
  }

  if (status === 'failed') {
    return (
      <div>
        Error:
        {error}
      </div>
    );
  }

  const handlePrevDoctor = () => {
    const prevDoctorId = parseInt(doctorIndex, 10) - 1;
    const hasPrevDoctor = getDoctorByIndex(doctors, prevDoctorId);
    if (hasPrevDoctor) {
      navigate(`/doctors/${hasPrevDoctor?.id || ''}`);
    }
  };

  const handleNextDoctor = () => {
    const nextDoctorId = parseInt(doctorIndex, 10) + 1;
    const hasNextDoctor = getDoctorByIndex(doctors, nextDoctorId);
    if (hasNextDoctor) {
      navigate(`/doctors/${hasNextDoctor?.id || ''}`);
    }
  };

  return (
    <div className="container-fluid">
      <div className="row">
        <div className="col-lg-2 col-md-2 col-12 d-flex flex-column justify-content-between custom_nav">
          <NavBar />
        </div>
        <div className="col-lg-10 col-md-10 col-12 p-0">
          <div className="row d-flex border border-primary vh-100 justify-content-center align-items-center">
            <div className="col-12 col-md-5 p-2 overflow-hidden">
              <button
                type="button"
                className="btn btn-primary rounded-end-pill previd"
                onClick={handlePrevDoctor}
                disabled={!doctor || doctorIndex <= 0}
              >
                Prev
              </button>
              <img
                src={doctor?.photo || ''}
                alt={doctor?.name || ''}
                className="img-fluid doctor-photo"
                style={{ height: 'auto', width: '100%' }}
              />
            </div>
            <div className="col-12 col-md-5 d-flex flex-column justify-content-center align-items-center">
              <h1>{doctor?.name || ''}</h1>
              <p>
                <strong>Email: </strong>
                {doctor?.email || ''}
              </p>
              <p>
                <strong>Specialization: </strong>
                {doctor?.specialization || ''}
              </p>
              <p>
                <strong>Qualification: </strong>
                {doctor?.qualification || ''}
              </p>
              <p>
                <strong>Age: </strong>
                {doctor?.age || ''}
              </p>
            </div>
          </div>
        </div>
      </div>
      <button
        type="button"
        className="carousel-btn next btn btn-primary rounded-start-pill"
        onClick={handleNextDoctor}
      >
        Next
      </button>
    </div>
  );
}

export default DoctorDetails;
