export const createEventDetails = (eventDetailsData) => {
  const eventData = eventDetailsData;

  const destinationDescription = eventData.description;
  const additionalOptions = eventData.options;


  const eventOfferSelector = additionalOptions.map((it) => {
    const isOptionChecked = Math.random() > 0.5;
    additionalOptions.isChecked = isOptionChecked ? `checked` : ``;

    return `<div class="event__offer-selector">
    <input class="event__offer-checkbox  visually-hidden" id="${it.id}" type="checkbox" name="${it.name}" ${additionalOptions.isChecked}>
    <label class="event__offer-label" for="${it.id}">
      <span class="event__offer-title">${it.title}</span>
      &plus;
      &euro;&nbsp;<span class="event__offer-price">${it.price}</span>
    </label>
  </div>`;
  }).join(``);

  const imageTemplate = eventData.pictures.map((it) => {
    return `<img class="event__photo" src="${it}" alt="Event photo">`;
  }).join(``);


  return `<section class="event__section  event__section--offers">
<h3 class="event__section-title  event__section-title--offers">Offers</h3>
  <div class="event__available-offers">${eventOfferSelector}</div>
</section>
<section class="event__section  event__section--destination">
  <h3 class="event__section-title  event__section-title--destination">Destination</h3>
  <p class="event__destination-description">${destinationDescription}</p>

<div class="event__photos-container">
<div class="event__photos-tape">${imageTemplate}</div>
</div>
</section>
</section>`;
};
