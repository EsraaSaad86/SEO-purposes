import React, { useEffect, useState } from 'react';
import getGeoJsonData from '../../Services/getLocationData';

function LocationForm() {
  const initialValues = {
    left: '',
    bottom: '',
    right: '',
    top: '',
  };
  const [formValues, setFormValues] = useState(initialValues);
  const [formErrors, setFormErrors] = useState({});
  const [isSubmit, setIsSubmit] = useState(false);
  const [locationData, setLocationData] = useState([]);

  useEffect(() => {
    if (Object.keys(formErrors).length === 0 && isSubmit) {
      fetchData();
    }
  }, [formErrors]);

  const fetchData = async () => {
    await getGeoJsonData(formValues)
      .then((data) => {
        setLocationData(data.features);
        setIsSubmit(false);
      })
      .catch((error) => {
        alert(error.data);
      });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setFormErrors(validate(formValues));
    setIsSubmit(true);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormValues({ ...formValues, [name]: value });
  };

  const validate = (values) => {
    let errors = {};

    if (values.left > values.right) {
      errors.left = 'left cannot be larger than right';
    }
    if (values.bottom > values.top) {
      errors.bottom = 'bottom cannot be larger than top';
    }

    return errors;
  };

  return (
    <div>
      <form
        role='form'
        onSubmit={(e) => {
          handleSubmit(e);
        }}
      >
        <div className='flex-element'>
          <label>min Longitude(left)</label>
          <input
            role='input'
            aria-label='left'
            name='left'
            type='number'
            min='-180.0'
            max='180.0'
            step='0.001'
            value={formValues.left}
            onChange={handleChange}
            required
          />
        </div>

        {formErrors.left ? <p>{formErrors.left}</p> : ''}

        <div className='flex-element'>
          <label>min Latitude(bottom)</label>
          <input
            role='input'
            aria-label='bottom'
            name='bottom'
            type='number'
            min='-90.0'
            max='90.0'
            step='0.001'
            value={formValues.bottom}
            onChange={handleChange}
            required
          />
        </div>

        {formErrors.bottom ? <p>{formErrors.bottom}</p> : ''}

        <div className='flex-element'>
          <label>max Longitude(right)</label>
          <input
            role='input'
            aria-label='right'
            name='right'
            type='number'
            min='-180.0'
            max='180.0'
            step='0.001'
            value={formValues.right}
            onChange={handleChange}
            required
          />
        </div>

        <div className='flex-element'>
          <label>max Latitude(top)</label>
          <input
            role='input'
            aria-label='top'
            name='top'
            type='number'
            min='-90.0'
            max='90.0'
            step='0.001'
            value={formValues.top}
            onChange={handleChange}
            required
          />
        </div>

        <input
          role='button'
          aria-label='Submit'
          className='submitButton'
          type='submit'
          value='Get Location Data'
        />
      </form>

      {locationData.length > 0 ? (
        <div>
          <table id='data' role='table' aria-label='Data Table'>
            <thead>
              <tr>
                <th>Type</th>
                <th>ID</th>
                <th>properties</th>
                <th>geometry</th>
              </tr>
            </thead>

            <tbody>
              {locationData.map((feature, i) => (
                <tr key={i}>
                  {Object.keys(feature).map((key, id) => (
                    <td key={id}>{JSON.stringify(feature[key])}</td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        ''
      )}
    </div>
  );
}

export default LocationForm;
