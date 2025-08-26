import { NextResponse } from "next/server";
import { networkInterfaces } from "os";

export async function GET() {
  try {
    const nets = networkInterfaces();
    const results = Object.create(null);

    for (const name of Object.keys(nets)) {
      for (const net of nets[name]!) {
        // Skip over non-IPv4 and internal (i.e. 127.0.0.1) addresses
        if (net.family === "IPv4" && !net.internal) {
          if (!results[name]) {
            results[name] = [];
          }
          results[name].push(net.address);
        }
      }
    }

    // Get the first available network IP
    const networkIPs = Object.values(results)
      .flat()
      .filter((ip) => ip && ip !== "127.0.0.1");
    const primaryIP = networkIPs[0] || "localhost";

    return NextResponse.json({
      success: true,
      networkIPs,
      primaryIP,
      localhost: "localhost:3000",
      networkURL: `http://${primaryIP}:3000`,
      message: `Use ${primaryIP}:3000 to access from mobile devices on the same network`,
    });
  } catch (error) {
    return NextResponse.json(
      {
        success: false,
        error: "Failed to get network information",
        localhost: "localhost:3000",
      },
      { status: 500 }
    );
  }
}
