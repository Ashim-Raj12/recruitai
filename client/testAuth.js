import mongoose from 'mongoose';
import dotenv from 'dotenv';
import jwt from 'jsonwebtoken';
import User from './server/models/User.js';
import { generateRefreshToken } from './server/utils/generateTokens.js';

dotenv.config({ path: './server/.env' });

const runTest = async () => {
  await mongoose.connect(process.env.MONGODB_URI);
  console.log('DB connected');

  const user = await User.findOne();
  console.log('Found user:', user.email);

  const token = generateRefreshToken(user._id);
  user.refreshToken = token;
  await user.save({ validateBeforeSave: false });
  console.log('Saved token to DB:', token);

  const dbUser = await User.findById(user._id);
  console.log('DB token matches?', dbUser.refreshToken === token);

  process.exit(0);
};

runTest();
    
    console.log('Attempting refresh with cookie:', cookie);
    
    const refreshRes = await api.post('/auth/refresh', {}, {
      headers: {
        Cookie: cookie
      }
    });
    
    console.log('Refresh successful!', refreshRes.data);
  } catch (error) {
    console.log('ERROR:', error.response ? error.response.data : error.message);
  }
};

runTest();
