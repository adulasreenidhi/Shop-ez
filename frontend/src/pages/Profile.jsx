function Profile() {
  const userData = JSON.parse(
    localStorage.getItem("user")
  );

  return (
    <div
      style={{
        padding: "40px 20px",
        display: "flex",
        justifyContent: "center",
         background: "#e2e8f0",
      }}
    >
      <div
        style={{
          width: "100%",
          maxWidth: "480px",
          background: "#ffffff",
          borderRadius: "20px",
          padding: "35px",
          boxShadow:
            "0 8px 25px rgba(0,0,0,0.1)",
        }}
      >
        {/* Heading */}

        <h1
          style={{
            textAlign: "center",
            color: "#111827",
            fontSize: "56px",
            marginBottom: "25px",
          }}
        >
          👤 My Profile
        </h1>

        {/* Avatar */}

        <div
          style={{
            width: "120px",
            height: "120px",
            background: "#f97316",
            borderRadius: "50%",
            margin: "0 auto 30px",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            color: "white",
            fontSize: "48px",
            fontWeight: "bold",
          }}
        >
          {userData.user.name
            .charAt(0)
            .toUpperCase()}
        </div>

        {/* User Details */}

        <div
          style={{
            marginBottom: "25px",
          }}
        >
          <div
            style={{
              background: "#f8fafc",
              padding: "15px",
              borderRadius: "12px",
              marginBottom: "12px",
            }}
          >
            <strong
              style={{
                color: "#6b7280",
              }}
            >
              Name
            </strong>

            <p
              style={{
                margin: "5px 0 0",
                fontSize: "20px",
                color: "#111827",
                fontWeight: "600",
              }}
            >
              {userData.user.name}
            </p>
          </div>

          <div
            style={{
              background: "#f8fafc",
              padding: "15px",
              borderRadius: "12px",
              marginBottom: "12px",
            }}
          >
            <strong
              style={{
                color: "#6b7280",
              }}
            >
              Email
            </strong>

            <p
              style={{
                margin: "5px 0 0",
                fontSize: "18px",
                color: "#111827",
              }}
            >
              {userData.user.email}
            </p>
          </div>

          <div
            style={{
              background: "#f8fafc",
              padding: "15px",
              borderRadius: "12px",
            }}
          >
            <strong
              style={{
                color: "#6b7280",
              }}
            >
              Role
            </strong>

            <div
              style={{
                marginTop: "10px",
              }}
            >
              <span
                style={{
                  background:
                    userData.user.role ===
                    "ADMIN"
                      ? "#fee2e2"
                      : "#dcfce7",
                  color:
                    userData.user.role ===
                    "ADMIN"
                      ? "#dc2626"
                      : "#166534",
                  padding:
                    "8px 16px",
                  borderRadius:
                    "20px",
                  fontWeight:
                    "bold",
                }}
              >
                {userData.user.role}
              </span>
            </div>
          </div>
        </div>

        {/* Quick Stats */}

        <div
          style={{
            display: "flex",
            gap: "15px",
            marginBottom: "25px",
          }}
        >
          <div
            style={{
              flex: 1,
              background: "#f8fafc",
              padding: "15px",
              borderRadius: "12px",
              textAlign: "center",
            }}
          >
            <h3
              style={{
                margin: 0,
                color: "#111827",
              }}
            >
              📦 Orders
            </h3>

            <p
              style={{
                fontSize: "22px",
                fontWeight: "bold",
                color: "#f97316",
                marginTop: "10px",
              }}
            >
              --
            </p>
          </div>

          <div
            style={{
              flex: 1,
              background: "#f8fafc",
              padding: "15px",
              borderRadius: "12px",
              textAlign: "center",
            }}
          >
            <h3
              style={{
                margin: 0,
                color: "#111827",
              }}
            >
              🛒 Cart
            </h3>

            <p
              style={{
                fontSize: "22px",
                fontWeight: "bold",
                color: "#f97316",
                marginTop: "10px",
              }}
            >
              --
            </p>
          </div>

          <div
            style={{
              flex: 1,
              background: "#f8fafc",
              padding: "15px",
              borderRadius: "12px",
              textAlign: "center",
            }}
          >
            <h3
              style={{
                margin: 0,
                color: "#111827",
              }}
            >
              ⭐ Member
            </h3>

            <p
              style={{
                fontSize: "18px",
                fontWeight: "bold",
                color: "#f97316",
                marginTop: "10px",
              }}
            >
              Active
            </p>
          </div>
        </div>

        {/* Account Information */}

        <div
          style={{
            background: "#f8fafc",
            padding: "20px",
            borderRadius: "12px",
          }}
        >
          <h2
            style={{
              color: "#111827",
              marginBottom: "10px",
            }}
          >
            Account Information
          </h2>

          <p
            style={{
              color: "#6b7280",
              lineHeight: "1.7",
            }}
          >
            Welcome to ShopEZ.
            <br />
            You can manage your orders,
            cart and profile from your
            dashboard.
          </p>
        </div>
      </div>
    </div>
  );
}

export default Profile;