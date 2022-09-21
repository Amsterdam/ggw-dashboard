const EconomieThema = ({ width = "48", height = "48" }: { width?: string; height?: string }) => {
  return (
    <svg width={width} height={height} version="1.1" viewBox="0 0 12.7 12.7" xmlns="http://www.w3.org/2000/svg">
      <g transform="matrix(.22224 0 0 -.22224 .050182 11.506)">
        <g>
          <g transform="translate(7.3973 .1007)">
            <path
              d="m0 0h41.892c3.076 0 5.571 2.494 5.571 5.57v9.34c0 2.111-0.78 4.036-2.061 5.51-0.675 0.81-4.333 5.44-5.194 11.822-0.21 1.535-1.516 2.68-3.063 2.68h-32.391c-1.548 0-2.86-1.145-3.065-2.68-0.859-6.382-4.518-11.012-5.192-11.822-1.282-1.474-2.061-3.404-2.061-5.51v-9.34c-7e-3 -3.076 2.488-5.57 5.564-5.57"
              fill="#231f20"
            />
          </g>
          <g transform="translate(4.6307 33.847)">
            <path
              d="m0 0c-0.539-2.971-1.715-7.105-4.24-9.959-0.57-0.638-0.508-1.616 0.13-2.186 0.297-0.259 0.662-0.389 1.027-0.389 0.427 0 0.854 0.173 1.158 0.519 3.002 3.386 4.363 8.097 4.97 11.458 0.347 1.918 2.012 3.312 3.961 3.312h33.419c1.944 0 3.609-1.394 3.961-3.312 0.614-3.361 1.969-8.072 4.971-11.458 0.303-0.346 0.73-0.519 1.157-0.519 0.365 0 0.731 0.13 1.028 0.389 0.637 0.57 0.699 1.548 0.129 2.186-2.525 2.847-3.701 6.988-4.239 9.959-0.619 3.392-3.565 5.855-7.007 5.855h-14.156l0.929 1.083c0.098-0.012 0.191-0.018 0.29-0.018 1.566 0 2.829 1.3 2.767 2.879-0.055 1.435-1.225 2.605-2.655 2.655-1.578 0.062-2.879-1.201-2.879-2.767 0-0.403 0.087-0.787 0.242-1.133l-0.916-1.071c-0.173-0.204-0.483-0.204-0.656 0l-0.904 1.053c0.18 0.414 0.26 0.885 0.211 1.38-0.137 1.324-1.22 2.383-2.551 2.476-1.622 0.118-2.971-1.163-2.971-2.761 0-1.528 1.238-2.767 2.767-2.767 0.118 0 0.229 7e-3 0.341 0.025l0.879-1.027h-14.157c-3.441-7e-3 -6.387-2.47-7.006-5.862"
              fill="#231f20"
            />
          </g>
          <text
            transform="matrix(.99432 0 0 -1 17.873 7.0732)"
            fill="#ffffff"
            style={{ fontFamily: "Amsterdam Sans", fontSize: "31.185px", fontWeight: "bold" }}
          >
            <tspan x="0" y="0">
              €
            </tspan>
          </text>
        </g>
      </g>
    </svg>
  );
};

export default EconomieThema;
