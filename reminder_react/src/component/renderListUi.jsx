import React, { Component } from "react";
import { delList } from "../fetchApi/fetchApiList";
import "../style/style.css";

class ParentComponent extends Component {
  constructor() {
    super();
    this.state = {
      isFormCommonListNoteVisible: false,
      selectedListForEdit: null,
    };
  }

  handleListNoteClick = (list) => {
    if (this.props.onListNoteClick) {
      this.props.onListNoteClick(list);
    }
  };
  handleDele = async (id) => {
    try {
      await delList(id);
      if (this.props.onListDeleteSuccess) {
        this.props.onListDeleteSuccess(id);
      }
    } catch (error) {
      console.error("Error fetching listNote:", error.message);
    }
  };

  render() {
    const { listNote } = this.props;

    return (
      <div>
        <h1>My list</h1>
        {listNote.map((list, index) => (
          <div className="listnote" key={list.id} id={list.id}>
            <div
              className="list-note"
              id={list.id}
              onClick={() => this.handleListNoteClick(list)}
            >
              <div
                className="item-list-none-left"
                onClick={() => this.handleClickName(list)}
              >
                <div
                  className="icon-list-note"
                  style={{ backgroundColor: list.isColor }}
                >
                  <span className="icon-list">
                    <svg
                      width="25"
                      height="25"
                      viewBox="0 0 16 16"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        fillRule="evenodd"
                        clipRule="evenodd"
                        d="M5 11.5C5 11.2239 5.22386 11 5.5 11H14.5C14.7761 11 15 11.2239 15 11.5C15 11.7761 14.7761 12 14.5 12H5.5C5.22386 12 5 11.7761 5 11.5Z"
                        fill="black"
                      />
                      <path
                        fillRule="evenodd"
                        clipRule="evenodd"
                        d="M5 7.5C5 7.22386 5.22386 7 5.5 7H14.5C14.7761 7 15 7.22386 15 7.5C15 7.77614 14.7761 8 14.5 8H5.5C5.22386 8 5 7.77614 5 7.5Z"
                        fill="black"
                      />
                      <path
                        fillRule="evenodd"
                        clipRule="evenodd"
                        d="M5 3.5C5 3.22386 5.22386 3 5.5 3H14.5C14.7761 3 15 3.22386 15 3.5C15 3.77614 14.7761 4 14.5 4H5.5C5.22386 4 5 3.77614 5 3.5Z"
                        fill="black"
                      />
                      <path
                        d="M2.24158 2.19355C2.32012 1.93548 2.67988 1.93548 2.75842 2.19355L2.91999 2.7244C2.95501 2.83948 3.05979 2.91795 3.17841 2.91795H3.72899C3.98772 2.91795 4.09879 3.25135 3.89319 3.41083L3.42479 3.77415C3.33471 3.84402 3.2971 3.96351 3.33057 4.07347L3.50391 4.64303C3.58166 4.8985 3.29055 5.10468 3.08128 4.94235L2.6642 4.61884C2.56726 4.54364 2.43274 4.54364 2.3358 4.61884L1.91872 4.94235C1.70945 5.10468 1.41834 4.8985 1.49609 4.64303L1.66943 4.07347C1.7029 3.96351 1.66529 3.84402 1.57521 3.77415L1.10681 3.41083C0.901213 3.25135 1.01228 2.91795 1.27101 2.91795H1.82159C1.94021 2.91795 2.04499 2.83947 2.08002 2.7244L2.24158 2.19355Z"
                        fill="black"
                      />
                      <path
                        d="M2.24158 6.19355C2.32012 5.93548 2.67988 5.93548 2.75842 6.19355L2.91999 6.7244C2.95501 6.83948 3.05979 6.91795 3.17841 6.91795H3.72899C3.98772 6.91795 4.09879 7.25135 3.89319 7.41083L3.42479 7.77415C3.33471 7.84402 3.2971 7.96351 3.33057 8.07347L3.50391 8.64303C3.58166 8.8985 3.29055 9.10468 3.08128 8.94235L2.6642 8.61884C2.56726 8.54364 2.43274 8.54364 2.3358 8.61884L1.91872 8.94235C1.70945 9.10468 1.41834 8.8985 1.49609 8.64303L1.66943 8.07347C1.7029 7.96351 1.66529 7.84402 1.57521 7.77415L1.10681 7.41083C0.901213 7.25135 1.01228 6.91795 1.27101 6.91795H1.82159C1.94021 6.91795 2.04499 6.83948 2.08002 6.7244L2.24158 6.19355Z"
                        fill="black"
                      />
                      <path
                        d="M2.24158 10.1936C2.32012 9.93548 2.67988 9.93548 2.75842 10.1936L2.91999 10.7244C2.95501 10.8395 3.05979 10.918 3.17841 10.918H3.72899C3.98772 10.918 4.09879 11.2514 3.89319 11.4108L3.42479 11.7741C3.33471 11.844 3.2971 11.9635 3.33057 12.0735L3.50391 12.643C3.58166 12.8985 3.29055 13.1047 3.08128 12.9424L2.6642 12.6188C2.56726 12.5436 2.43274 12.5436 2.3358 12.6188L1.91872 12.9424C1.70945 13.1047 1.41834 12.8985 1.49609 12.643L1.66943 12.0735C1.7029 11.9635 1.66529 11.844 1.57521 11.7741L1.10681 11.4108C0.901213 11.2514 1.01228 10.918 1.27101 10.918H1.82159C1.94021 10.918 2.04499 10.8395 2.08002 10.7244L2.24158 10.1936Z"
                        fill="black"
                      />
                    </svg>
                  </span>
                </div>
                <span className="name-list">{list.name}</span>
              </div>
              <div className="item-list-none-right">
                <span
                  className="number-items-notes"
                  id={`total-done-${list.id}`}
                >
                  0
                </span>
                <span
                  className="number-items-note"
                  id={`total-count-${list.id}`}
                >
                  /0
                </span>
              </div>
            </div>
            <div className="icon-home-list-del">
              <div className="dropdown">
                <button
                  className="btn"
                  type="button"
                  id={`dropdownMenuButton${list.id}`}
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                >
                  <span className="icon-next">
                    <svg
                      width="18"
                      height="18"
                      viewBox="0 0 16 16"
                      fill="none"
                      xmlns="http:www.w3.org/2000/svg"
                    >
                      <path
                        fillRule="evenodd"
                        clipRule="evenodd"
                        d="M4.64645 1.64645C4.84171 1.45118 5.15829 1.45118 5.35355 1.64645L11.3536 7.64645C11.5488 7.84171 11.5488 8.15829 11.3536 8.35355L5.35355 14.3536C5.15829 14.5488 4.84171 14.5488 4.64645 14.3536C4.45118 14.1583 4.45118 13.8417 4.64645 13.6464L10.2929 8L4.64645 2.35355C4.45118 2.15829 4.45118 1.84171 4.64645 1.64645Z"
                        fill="black"
                      />
                    </svg>
                  </span>
                </button>
                <ul
                  className="dropdown-menu width-drop"
                  style={{ width: "50px !important" }}
                  aria-labelledby={`dropdownMenuButton${list.id}`}
                >
                  <li>
                    <a
                      className="dropdown-item delete"
                      href="#"
                      onClick={() => {
                        this.handleDele(list.id);
                      }}
                    >
                      <span className="delete-icon">
                        <svg
                          width="16"
                          height="16"
                          viewBox="0 0 16 16"
                          fill="none"
                          xmlns="http:www.w3.org/2000/svg"
                        >
                          <path
                            d="M6.5 1H9.5C9.77614 1 10 1.22386 10 1.5V2.5H6V1.5C6 1.22386 6.22386 1 6.5 1ZM11 2.5V1.5C11 0.671573 10.3284 0 9.5 0H6.5C5.67157 0 5 0.671573 5 1.5V2.5H2.50566C2.50226 2.49997 2.49885 2.49997 2.49544 2.5H1.5C1.22386 2.5 1 2.72386 1 3C1 3.27614 1.22386 3.5 1.5 3.5H2.0384L2.89116 14.1595C2.97431 15.1989 3.84207 16 4.88479 16H11.1152C12.1579 16 13.0257 15.1989 13.1088 14.1595L13.9616 3.5H14.5C14.7761 3.5 15 3.27614 15 3C15 2.72386 14.7761 2.5 14.5 2.5H13.5046C13.5011 2.49997 13.4977 2.49997 13.4943 2.5H11ZM12.9584 3.5L12.112 14.0797C12.0704 14.5994 11.6366 15 11.1152 15H4.88479C4.36343 15 3.92955 14.5994 3.88798 14.0797L3.0416 3.5H12.9584ZM5.47064 4.50086C5.74631 4.48465 5.98292 4.69497 5.99914 4.97064L6.49914 13.4706C6.51535 13.7463 6.30503 13.9829 6.02936 13.9991C5.7537 14.0154 5.51708 13.805 5.50086 13.5294L5.00086 5.02936C4.98465 4.7537 5.19497 4.51708 5.47064 4.50086ZM10.5294 4.50086C10.805 4.51708 11.0154 4.7537 10.9991 5.02936L10.4991 13.5294C10.4829 13.805 10.2463 14.0154 9.97064 13.9991C9.69497 13.9829 9.48465 13.7463 9.50086 13.4706L10.0009 4.97064C10.0171 4.69497 10.2537 4.48465 10.5294 4.50086ZM8 4.5C8.27614 4.5 8.5 4.72386 8.5 5V13.5C8.5 13.7761 8.27614 14 8 14C7.72386 14 7.5 13.7761 7.5 13.5V5C7.5 4.72386 7.72386 4.5 8 4.5Z"
                            fill="black"
                          />
                        </svg>
                      </span>
                    </a>
                  </li>
                  <li>
                    <a
                      className="dropdown-item edit"
                      href="#"
                      onClick={() => this.handleListNoteClick(list)}
                    >
                      <span className="edit-icon edit-list">
                        <svg
                          width="16"
                          height="16"
                          viewBox="0 0 16 16"
                          fill="none"
                          xmlns="http:www.w3.org/2000/svg"
                        >
                          <path
                            d="M16 8C16 12.4183 12.4183 16 8 16C3.58172 16 0 12.4183 0 8C0 3.58172 3.58172 0 8 0C12.4183 0 16 3.58172 16 8ZM11.4992 14.064L10.2186 9.36844C10.1593 9.15091 9.96168 9 9.7362 9H6.2638C6.03832 9 5.84074 9.15091 5.78141 9.36844L4.50081 14.064C5.53023 14.6593 6.72533 15 8 15C9.27467 15 10.4698 14.6593 11.4992 14.064ZM12.3728 13.4665C13.9744 12.1837 15 10.2116 15 8C15 4.13401 11.866 1 8 1C4.13401 1 1 4.13401 1 8C1 10.2116 2.02565 12.1837 3.62724 13.4665L4.81665 9.10532C4.98244 8.49743 5.50812 8.06295 6.1261 8.00629L7.28163 4.15451C7.49543 3.44186 8.50457 3.44186 8.71837 4.15451L9.8739 8.00629C10.4919 8.06295 11.0176 8.49743 11.1833 9.10532L12.3728 13.4665Z"
                            fill="black"
                          />
                        </svg>
                      </span>
                    </a>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        ))}
      </div>
    );
  }
}

export default ParentComponent;
